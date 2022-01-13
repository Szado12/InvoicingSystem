using InvoiceAppAPI.Models;

namespace InvoiceAppAPI.ViewModel
{
  public class InvoiceRowCalculated
  {
    public decimal NumberOfProducts { get; set; }
    public decimal Discount { get; set; }
    public Product Product { get; set; }
    public decimal DiscountedPrice { get; set; }
    public decimal SummedNettoValue { get; set; }
    public decimal SummedVatValue { get; set; }
    public decimal SummedBruttoValue { get; set; }
  }
}
