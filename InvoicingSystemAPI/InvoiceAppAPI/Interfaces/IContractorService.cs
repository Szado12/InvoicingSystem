using System.Collections.Generic;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Interfaces
{
  public interface IContractorService
  {
    List<ContractorView> GetContractorView();
    bool CreateAction(ContractorView contractorView, string action);
    bool DeleteContractor(int id);
  }
}
