using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceAppAPI.ViewModel
{
  public class ContractorView
  {
    public int Id { get; set; }
    public string CompanyName { get; set; }
    public string Address { get; set; }
    public string ZipCode { get; set; }
    public string Nip { get; set; }
    public string City { get; set; }

  }
}
