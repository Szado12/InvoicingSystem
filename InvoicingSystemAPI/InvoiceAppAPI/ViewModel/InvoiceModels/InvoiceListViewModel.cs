using System;

namespace InvoiceAppAPI.ViewModel
{
  public class InvoiceListViewModel
  {
    public int Id { get; set; }
    public string InvoiceNumber { get; set; }
    public string InvoiceContractor { get; set; }
    public string CreationDate { get; set; }
    public string? ModifyDate { get; set; }
    public string PaymentDate { get; set; }
    public string PaymentMethod { get; set; }
  }
}
