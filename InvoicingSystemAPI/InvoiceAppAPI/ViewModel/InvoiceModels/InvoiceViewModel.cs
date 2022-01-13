using System;
using System.Collections.Generic;
using System.Security.Permissions;
using InvoiceAppAPI.Models;

namespace InvoiceAppAPI.ViewModel.InvoiceModels
{
  public class InvoiceViewModel
  {
    public int Id { get; set; }
    public string InvoiceNumber { get; set; }
    public int ContractorId { get; set; }
    public int EmployeeId { get; set; }
    public int PaymentMethodId { get; set; }
    public DateTime PaymentDate { get; set; }
    public virtual ICollection<InvoiceRow> InvoiceRows { get; set; }
  }
}
