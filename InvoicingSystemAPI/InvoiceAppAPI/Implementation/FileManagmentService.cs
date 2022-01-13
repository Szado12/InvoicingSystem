using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;
using Microsoft.EntityFrameworkCore;
using SelectPdf;
using Humanizer;
using InvoiceAppAPI.Utilities;

namespace InvoiceAppAPI.Implementation
{
  public class FileManagmentService : DefaultService, IFileManagmentService
  {
    private const string HTMLBeggining = @"
      <html>
        <head>
            <meta charset='UTF-8'>
        </head>";

    private const string HTMLStyle = @"
      <style>
          .mainInfoTable table{
              text-align: left;
          }
          body {
            font-family:Arial;
            width: 1024px;
          }
          .mainInfoTable th{
              padding: 0;
              background-color: gray;
              border: 1px solid black;
              text-align: left;
          }

          table{
              margin-top: 10px;
              width: 100%;
          }
          th{
              padding-left:10px;
              padding-right:10px;
              padding: 0;
              background-color: gray;
              border: 1px solid black;
          }
          .tdNumer{
              text-align: right;
          }
          td{
              padding-left:10px;
              padding-right:10px;
              border: 1px solid black;
          }
          td:empty{
              visibility: hidden;
          }
      </style>";
    private const string HTMLBodyOpening = "<body>";
    
    private const string HTMLBodyAndFileClose = "</body ></html>";

    private string CreateHTMLForInvoiceBeggining(string invoiceNumber, string type)
    {
      return $@"<table class='mainInfoTable' cellspacing='0'>
        <tr>
            <th colspan='2'>Faktura nr {invoiceNumber} - {type.ToUpper()}</th>
        </tr>";
    }
  private string CreateHTMLForCompanyData(CompanyData companyData)
    {
      
      return $@"
        <tr>
            <td>
                Sprzedawca:<br/> 
                {companyData.CompanyName}<br/> 
                {(companyData.Address.StartsWith("ul.") ? "" : "ul. ")}  
                {companyData.Address}<br/> 
                {companyData.ZipCode} {companyData.City}<br/> 
                NIP: {companyData.Nip}<br/> 
            </td>";
    }

    /// <summary>
    /// Create HTML for Date, place, Payment method
    /// </summary>
    /// <returns></returns>
    private string CreateHTMLForGeneralInfo(DateTime dateTime, CompanyData companyData)
    {
      return $@"
          <td>
            Data wystawienia faktury: {dateTime.ToShortDateString()} <br/>
            Miejsce wystawienia faktury: {companyData.City} <br/>
            Data sprzedaży: {dateTime.ToShortDateString()} <br/>
          </td>
        </tr> ";
    }

    private string CreateHTMLForContrahent(Contractor contractor)
    {
      return $@"<tr>
            <th colspan='2'>Nabywca</th>
        </tr>
        <tr>
            <td colspan='2'>
                {contractor.CompanyName} <br/>
                ul. {contractor.Address} <br/>
                {contractor.ZipCode} {contractor.City}<br/>
                NIP: {contractor.Nip} <br/>
            </td>
        </tr>";
    }
    private string CreateHTMLForPayment(PaymentMethod payment, CompanyData companyData, DateTime paymentDate)
    {
      return $@"<tr>
            <th colspan='2'>Płatność</th>
        </tr>
        <tr>
            <td colspan='2'>
                Rodzaj płatności : {payment.Name} <br/>
                Termin płatności: {paymentDate.ToShortDateString()} </br>
                {((payment.Id == 2) ? $"Bank: {companyData.BankName} </br> Numer konta: {companyData.AccountNumber} </br>" : "")}
            </td>
        </tr>
      </table>";
    }
    private string CreateHTMLForRow(InvoiceRowCalculated invoiceRow, int index)
    {

      return $@"<tr>
            <td>{index+1}.</td>
            <td>{invoiceRow.Product.Name}</td>
            <td>{invoiceRow.Product.CatalogNumber}</td>
            <td>{invoiceRow.Product.MeasurementUnits}</td>
            <td class='tdNumer'>{String.Format("{0:0.####}", invoiceRow.NumberOfProducts)}</td>
            <td class='tdNumer'>{invoiceRow.Product.PriceNetto:F}</td>
            <td class='tdNumer'>{String.Format("{0:0.##}", invoiceRow.Discount * 100)}</td>
            <td class='tdNumer'>{invoiceRow.DiscountedPrice:F}</td>
            <td class='tdNumer'>{invoiceRow.SummedNettoValue:F}</td>
            <td class='tdNumer'>{invoiceRow.Product.Vat}</td>
            <td class='tdNumer'>{invoiceRow.SummedVatValue:F}</td>
            <td class='tdNumer'>{invoiceRow.SummedBruttoValue:F}</td>
          </tr>";
    }

   private string CreateTableForSignautre(Employee employee)
   {
     string x = employee.FirstName.EndsWith("a") ? "a" : "";
     return $@"
      <Table style='text-align: center' cellspacing='0' style=>
        <Tr>
          <td>
            <br/>
            <p>.....................................................</p>
            <p> Towar i dokument odebrał<p>
          </td>
          <td>
            <br/>
            <p>.....................................................</p>
            <p> Data odbioru dokumentu<p>
          </td>
          <td>
            <br/>
            <p>{employee.FirstName} {employee.LastName}</p>
            <p> Dokument wystawił{(employee.FirstName.EndsWith("a") ? "a" : "")}<p>
          </td>
        <Tr>
      </Table>
      ";
   }

    private string CreateTableForProducts(ICollection<InvoiceRowCalculated> invoiceRowsCalculated)
    {
      string table = @"
      <br/>
      <br/>
      <table class='invoiceTable' cellspacing='0'>
        <tr>
          <th rowspan='2'>Lp.</th>
          <th rowspan='2'>Nazwa towaru lub usługi</th>
          <th rowspan='2'>Numer katalogowy</th>
          <th rowspan='2'>JM</th>
          <th rowspan='2'>Ilość</th>
          <th rowspan='2'>Cena jednostkowa netto</th>
          <th colspan='2'>Rabat</th>
          <th rowspan='2'>Wartość netto</th>
          <th colspan='2'>Podatek VAT</th>
          <th rowspan='2'>Wartość Brutto</th>
        </tr>
        <tr>
            <th>%</th>
            <th>Cena jedn. po rabacie</th>
            <th>Stawka</th>
            <th>Kwota</th>
        </tr>";

      for(int i=0; i< invoiceRowsCalculated.Count; i++)
      {
        table += CreateHTMLForRow(invoiceRowsCalculated.ElementAt(i),i);
      }

      table += $@"
          <tr>
              <td colspan='6'></td>
              <th colspan='2'>Suma</th>
              <td class='tdNumer'>{invoiceRowsCalculated.Sum(x=>x.SummedNettoValue):F}</td>
              <td class='tdNumer'>X</td>
              <td class='tdNumer'>{invoiceRowsCalculated.Sum(x => x.SummedVatValue):F}</td>
              <td class='tdNumer'>{invoiceRowsCalculated.Sum(x => x.SummedBruttoValue):F}</td>
          </tr>";
      var vatArray = invoiceRowsCalculated.GroupBy(x => x.Product.Vat);
      
      foreach (var VatType in vatArray)
      {
        table += $@"
          <tr>
              <td colspan='6'></td>
              <th colspan='2'>W tym</th>
              <td class='tdNumer'>{VatType.Sum(x => x.SummedNettoValue):F}</td>
              <td class='tdNumer'>{VatType.Key}</td>
              <td class='tdNumer'>{VatType.Sum(x => x.SummedVatValue):F}</td>
              <td class='tdNumer'>{VatType.Sum(x => x.SummedBruttoValue):F}</td>
          </tr>";
      }

      table += "</table>";
      
      return table;
    }

    private decimal CalculateDiscount(ICollection<InvoiceRowCalculated> invoiceRowsCalculated)
    {
      decimal valueWithoutDiscount = invoiceRowsCalculated.Sum(x =>
        x.NumberOfProducts * x.Product.PriceNetto * (1 + (Convert.ToDecimal(x.Product.Vat) / 100)));
      return valueWithoutDiscount - invoiceRowsCalculated.Sum(x => x.SummedBruttoValue);
    }
    private string CreateHTMLForTextValues(ICollection<InvoiceRowCalculated> invoiceRowsCalculated)
    {
      string TextValues = "";
      if (invoiceRowsCalculated.Any(x => x.Discount > 0))
      {
        TextValues +=
          $"Udzielono sumarycznego rabatu w wysokości: {CalculateDiscount(invoiceRowsCalculated):F} PLN <br/>";
      }

      var invoiceValue = invoiceRowsCalculated.Sum(x => x.SummedBruttoValue);
      var overallValue = Decimal.ToInt32(invoiceValue);
      var partValue = Decimal.ToInt32(invoiceValue*100%100);

      TextValues += @$"<b> Kwota należności: {invoiceValue:F} PLN</b> <br/>";
      TextValues += @$"<b> Kwota należności słownie: {ValueToWords.NumberToValue(overallValue)} {ValueToWords.FitCurrencyName(overallValue,"PLN")} {ValueToWords.NumberToValue(partValue)} {ValueToWords.FitCurrencyName(partValue, ".PLN")}</b> <br/>";
      return TextValues;
    }

    public MemoryStream CreateFileForInvoice(int invoiceID, string type)
    {
      Invoice invoice = InvoiceContext.Invoices
        .Include(inv=>inv.CompanyData)
        .Include(inv=>inv.Contractor)
        .Include(inv=> inv.PaymentMethod)
        .Include(inv => inv.InvoiceRows).ThenInclude(row => row.Product)
        .Include(inv => inv.Employee)
        .First(inv => inv.Id == invoiceID);

      var detailedInvoiceRow =
        Mapper.Map<ICollection<InvoiceRow>, ICollection<InvoiceRowCalculated>>(invoice.InvoiceRows);
      string html = HTMLBeggining + HTMLStyle + HTMLBodyOpening;

      html += CreateHTMLForInvoiceBeggining(invoice.InvoiceNumber, type);
      html += CreateHTMLForCompanyData(invoice.CompanyData);
      html += CreateHTMLForGeneralInfo(invoice.CreationDate, invoice.CompanyData);
      html += CreateHTMLForContrahent(invoice.Contractor);
      html += CreateHTMLForPayment(invoice.PaymentMethod, invoice.CompanyData,invoice.PaymentDate);
      html += CreateTableForProducts(detailedInvoiceRow);
      html += CreateHTMLForTextValues(detailedInvoiceRow);
      html += CreateTableForSignautre(invoice.Employee);

      html += HTMLBodyAndFileClose;
      HtmlToPdf converter = new HtmlToPdf();
      
      converter.Options.PdfPageSize = PdfPageSize.A4;
      converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
      converter.Options.WebPageWidth = 1050;
      converter.Options.WebPageHeight = 0;

      MemoryStream ms = new MemoryStream();
      PdfDocument doc = converter.ConvertHtmlString(html);
      
      doc.Save(ms);
      
      doc.Close();

      ms.Flush();
      ms.Position = 0;
      return ms;
    }
  }
}