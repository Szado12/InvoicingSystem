using System;
using System.Linq;
using AutoMapper.Internal;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Implementation
{
  public class CompanyDataService : DefaultService, ICompanyDataService
  {
    public CompanyDataViewModel GetCurrentCompanyData()
    {
      return Mapper.Map<CompanyData,CompanyDataViewModel>(InvoiceContext.CompanyData.First(data => data.CurrentVersion == true));
    }

    public bool EditCompanyData(CompanyDataViewModel companyDataViewModel)
    {
        InvoiceContext.CompanyData.ForAll(data => data.CurrentVersion = false);
        CompanyData newData = Mapper.Map<CompanyDataViewModel, CompanyData>(companyDataViewModel);
        newData.CurrentVersion = true;
        newData.Id = 0;
        InvoiceContext.CompanyData.Add(newData);
        return InvoiceContext.SaveChanges() > 0;
    }
    
  }
}
