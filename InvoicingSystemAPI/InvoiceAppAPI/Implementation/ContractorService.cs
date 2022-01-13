using System.Collections.Generic;
using System.Linq;
using AutoMapper.Internal;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;
using CSharpFunctionalExtensions;

namespace InvoiceAppAPI.Implementation
{
  public class ContractorService : DefaultService, IContractorService
  {
    private const string InsertActionString = "add";
    private const string EditActionString = "edit";

    public List<ContractorView> GetContractorView()
    {
      return Mapper.Map<List<Contractor>, List<ContractorView>>(InvoiceContext.Contractors
        .Where(x => x.CurrentVersion == true).ToList());
    }

    public bool CreateAction(ContractorView contractorView, string action)
    {
      switch (action)
      {
        case EditActionString:
          return EditContractor(contractorView);
        case InsertActionString:
          return CreateContractor(contractorView);
        default:
          return false;
      }
    }

    private bool DeleteNotUsedContractor(int id)
    {
      var contractor = InvoiceContext.Contractors.First(cont => cont.Id == id);
      InvoiceContext.Contractors.Remove(contractor);
      return InvoiceContext.SaveChanges() != 0;
    }

    public bool DeleteContractor(int id)
    {
      if (CheckIsContractorNotUsed(id))
      {
        return DeleteNotUsedContractor(id);
      }

      InvoiceContext.Contractors.Where(x => x.Id == id).ForAll(x => x.CurrentVersion = false);
      return InvoiceContext.SaveChanges() != 0;
    }

    private bool CreateContractor(ContractorView contractorView)
    {
      var newContractor = MapViewToContractor(contractorView);
      newContractor.Id = 0;
      InvoiceContext.Contractors.Add(newContractor);
      return InvoiceContext.SaveChanges() > 0;
    }

    private bool CreateContractor(Contractor contractor)
    {
      contractor.Id = 0;
      InvoiceContext.Contractors.Add(contractor);
      return InvoiceContext.SaveChanges() > 0;
    }

    private bool EditContractor(ContractorView contractorView)
    {
      var newContractor = MapViewToContractor(contractorView);
      if (CheckIsContractorNotUsed(contractorView.Id))
      {
        return EditNotUsedContractor(newContractor);
      }

      Contractor oldContractor = InvoiceContext.Contractors.First(x => x.Id == contractorView.Id);
      oldContractor.CurrentVersion = false;
      newContractor.RootContractorId =
        oldContractor.RootContractorId ?? oldContractor.Id;
      return CreateContractor(newContractor);
    }

    private bool EditNotUsedContractor(Contractor contractor)
    {
      var oldContractor = InvoiceContext.Contractors.First(cont => cont.Id == contractor.Id);
      InvoiceContext.Entry(oldContractor).CurrentValues.SetValues(contractor);
      return InvoiceContext.SaveChanges() != 0;
    }

    private Contractor MapViewToContractor(ContractorView contractorView)
    {
      return new Contractor()
      {
        Id = contractorView.Id,
        City = contractorView.City,
        CurrentVersion = true,
        Nip = contractorView.Nip,
        ZipCode = contractorView.ZipCode,
        CompanyName = contractorView.CompanyName,
        Address = contractorView.Address
      };
    }

    private bool CheckIsContractorNotUsed(int id)
    {
      return InvoiceContext.Invoices.Where(inv => inv.ContractorId == id).ToList().Count <= 0;
    }
  }
}