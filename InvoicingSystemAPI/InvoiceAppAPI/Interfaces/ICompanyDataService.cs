using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Interfaces
{
  public interface ICompanyDataService
  {
    CompanyDataViewModel GetCurrentCompanyData();
    bool EditCompanyData(CompanyDataViewModel companyDataViewModel);
  }
}
