using System.Collections.Generic;
using InvoiceAppAPI.ViewModel.EmployeesToContractors;

namespace InvoiceAppAPI.Interfaces
{
  public interface IEmployeesToContractorsService
  {
    EmployeesToContractorModel GetEmployeesToContractorData(int managerId);
    bool SetEmployeesToContractorData(int managerId, List<ContractorInfo> contractorInfos);
  }
}
