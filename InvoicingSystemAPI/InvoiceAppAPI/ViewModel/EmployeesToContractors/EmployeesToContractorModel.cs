using System.Collections.Generic;

namespace InvoiceAppAPI.ViewModel.EmployeesToContractors
{
  public class EmployeesToContractorModel
  {
    public virtual ICollection<EmployeeInfo> Employees { get; set; }
    public virtual ICollection<ContractorInfo> Contractors { get; set; }

  }
}
