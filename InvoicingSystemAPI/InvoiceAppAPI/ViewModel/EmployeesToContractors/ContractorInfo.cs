using System.Collections.Generic;

namespace InvoiceAppAPI.ViewModel.EmployeesToContractors
{
  public class ContractorInfo
  {
    public string Name { get; set; }
    public int Id { get; set; }
    public virtual ICollection<int> EmployeesId { get; set; }
  }
}
