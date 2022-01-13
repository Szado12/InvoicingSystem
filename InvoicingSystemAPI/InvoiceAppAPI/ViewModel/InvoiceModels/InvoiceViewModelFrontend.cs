using System;
using System.Collections.Generic;

namespace InvoiceAppAPI.ViewModel.InvoiceModels
{
  public class InvoiceViewModelFrontend
  {
    public int Id { get; set; }
    public string InvoiceNumber { get; set; }
    public int ContractorId { get; set; }
    public int PaymentMethodId { get; set; }
    public DateTime PaymentDate { get; set; }
    public virtual ICollection<InvoiceRowViewModel> InvoiceRows { get; set; }
  }
}
