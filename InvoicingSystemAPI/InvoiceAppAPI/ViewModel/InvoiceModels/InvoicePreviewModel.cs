using System;
using System.Collections.Generic;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel.User;

namespace InvoiceAppAPI.ViewModel.InvoiceModels
{
  public class InvoicePreviewModel
  {
    public int Id { get; set; }
    public string InvoiceNumber { get; set; }
    public DateTime PaymentDate { get; set; }
    public virtual CompanyDataViewModel CompanyData { get; set; }
    public virtual ContractorView Contractor { get; set; }
    public virtual UserData Employee { get; set; }
    public virtual PaymentMethodViewForTypeahead PaymentMethod { get; set; }
    public virtual ICollection<InvoiceRowViewModel> InvoiceRows { get; set; }
  }
}
