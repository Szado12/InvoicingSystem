using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.Internal;
using Humanizer;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.InvoiceModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAppAPI.Implementation
{
  public class InvoiceService : DefaultService, IInvoiceService
  {
    private const string InsertActionString = "add";
    private const string EditActionString = "edit";

    private List<int> AllowedInvoicesIds(int employeeId, int roleId)
    {
      if(roleId <= 2)
          return InvoiceContext.Invoices.Select(inv => inv.Id).ToList();

      var ContractorsId = InvoiceContext.EmployeesContractors.Where(emp => emp.EmployeeId == employeeId)
        .Select(x => x.RootContractorId).ToList();

      return InvoiceContext.Invoices.Include(inv => inv.Contractor)
        .Where(inv => ContractorsId.Contains(inv.Contractor.RootContractorId ?? inv.ContractorId) || inv.EmployeeId == employeeId).Select(inv => inv.Id).ToList();
    }
    public string CreateInvoiceNumber(DateTime date)
    {
      int number =
        InvoiceContext.Invoices.Count(x => x.CreationDate.Month == date.Month && x.CreationDate.Year == date.Year && x.CurrentVersion) + 1;
      return $"FV{number}/{String.Format("{0:00}",date.Month)}/{date.Year}";
    }

    private int CreateInvoice(InvoiceViewModel invoiceViewModel, int employeeId)
    {
      Invoice invoice = MapToInvoice(invoiceViewModel);
      invoice.Id = 0;
      invoice.EmployeeId = employeeId;

      InvoiceContext.Invoices.Add(invoice);
      InvoiceContext.SaveChanges();
      try
      {
        AddInvoicesRows(invoiceViewModel, invoice.Id);
      }
      catch (Exception e)
      {
        InvoiceContext.Invoices.Remove(invoice);
        InvoiceContext.SaveChanges();
        throw e;
      }
      return invoice.Id;
    }

    private int EditInvoice(InvoiceViewModel invoiceViewModel, int employeeId, int roleId)
    {
      if(!AllowedInvoicesIds(employeeId, roleId).Contains(invoiceViewModel.Id))
        throw new Exception("Brak prawa do zapisu");

      Invoice invoice = MapToInvoice(invoiceViewModel);
      Invoice previousVersion = InvoiceContext.Invoices.First(x => x.Id == invoiceViewModel.Id);
      previousVersion.CurrentVersion = false;

      invoice.Id = 0;
      invoice.EmployeeId = employeeId;
      invoice.ModifyDate = DateTime.Now;
      invoice.CreationDate = previousVersion.CreationDate;

      InvoiceContext.Invoices.Add(invoice);
      InvoiceContext.SaveChanges();
      try
      {
        AddInvoicesRows(invoiceViewModel, invoice.Id);
      }
      catch (Exception e)
      {
        InvoiceContext.Invoices.Remove(invoice);
        throw e;
      }
      return invoice.Id;
    }

    public Object GetInvoiceById(int id,string type, int employeeId, int roleId)
    {
      if (AllowedInvoicesIds(employeeId,roleId).Contains(id))
      {
        switch (type)
        {
          case "short":
            Invoice invoice = InvoiceContext.Invoices
              .Include(inv => inv.InvoiceRows)
              .ThenInclude(t => t.Product)
              .FirstOrDefault(inv => inv.Id == id);
            return Mapper.Map<Invoice, InvoiceViewModelFrontend>(invoice);
          case "full":
            Invoice invoiceFull = InvoiceContext.Invoices
              .Include(inv => inv.Employee)
              .Include(inv => inv.Contractor)
              .Include(inv => inv.PaymentMethod)
              .Include(inv => inv.CompanyData)
              .Include(x => x.InvoiceRows)
              .ThenInclude(t => t.Product)
              .FirstOrDefault(inv => inv.Id == id);
            return Mapper.Map<Invoice, InvoicePreviewModel>(invoiceFull);
        }
      }
      throw new Exception("Brak prawa do odczytu");
    }

    private bool AddInvoicesRows(InvoiceViewModel invoiceViewModel, int invoiceId)
    {
      foreach (var invoiceRow in invoiceViewModel.InvoiceRows)
      {
        InvoiceContext.InvoiceRows.Add(new InvoiceRow()
        {
          Id = 0,
          InvoiceId = invoiceId,
          ProductId = invoiceRow.Product.Id,
          Discount = invoiceRow.Discount,
          NumberOfProducts = invoiceRow.NumberOfProducts
        });
      }
      return InvoiceContext.SaveChanges() > 0;
    }

    public List<InvoiceListViewModel> GetInvoices(int employeeId, int roleId)
    {
      var allowedInvoices = AllowedInvoicesIds(employeeId,roleId);
      return Mapper.Map<List<Invoice>,List<InvoiceListViewModel>>(InvoiceContext.Invoices
        .Include(x=>x.Contractor)
        .Include(inv => inv.PaymentMethod)
        .Where(inv=> allowedInvoices.Contains(inv.Id))
        .Where(x => x.CurrentVersion == true)
        .ToList());
    }

    public int CreateAcition(InvoiceViewModel invoiceViewModel, string action,int employeeId, int roleId)
    {
      switch (action)
      {
        case EditActionString:
          return EditInvoice(invoiceViewModel,employeeId, roleId);
        case InsertActionString:
          return CreateInvoice(invoiceViewModel,employeeId);
        default:
          return 0;
      }
    }

    private Invoice MapToInvoice(InvoiceViewModel invoiceViewModel)
    {
      return new Invoice()
      {
        Id = invoiceViewModel.Id,
        CompanyDataId = InvoiceContext.CompanyData.First(data => data.CurrentVersion == true).Id,
        PaymentMethodId = invoiceViewModel.PaymentMethodId,
        InvoiceNumber = CreateInvoiceNumber(DateTime.Now),
        ContractorId = invoiceViewModel.ContractorId,
        CreationDate = DateTime.Now,
        PaymentDate = invoiceViewModel.PaymentDate,
        CurrentVersion = true
      };
    }
  }
}
