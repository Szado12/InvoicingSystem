using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel.EmployeesToContractors;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace InvoiceAppAPI.Implementation
{
  public class EmployeesToContractorsService : DefaultService, IEmployeesToContractorsService
  {
    
    public EmployeesToContractorModel GetEmployeesToContractorData(int managerId)
    {
      var employeeInfos = Mapper.Map<List<Employee>, List<EmployeeInfo>>(InvoiceContext.Employees
        .Where(emp => emp.ManagerId == managerId && emp.Fired == false).ToList());
      var contractors = InvoiceContext.Contractors.Where(con => con.CurrentVersion == true)
        .Select(x => new {Name = x.CompanyName, Id = x.RootContractorId ?? x.Id}).ToList();
      var data = InvoiceContext.EmployeesContractors
        .Include(empCon => empCon.RootContractor)
        .Where(src => employeeInfos
          .Select(emp => emp.Id)
          .Contains(src.EmployeeId))
        .Select(src=> new {src.RootContractorId,src.EmployeeId})
        .AsEnumerable()
        .GroupBy(sd=>sd.RootContractorId)
        .ToList();

      List<ContractorInfo> contractorInfos = new List<ContractorInfo>();
      foreach (var contractor in contractors)
      {
        contractorInfos.Add(
          new ContractorInfo()
          {
            EmployeesId = data.Single(x=>x.Key == contractor.Id)
              .OrderBy(x=>x.EmployeeId)
              .Select(x=>x.EmployeeId)
              .ToList(),
            Id = contractor.Id,
            Name = contractor.Name
          });
      }
      return new EmployeesToContractorModel(){Contractors = contractorInfos, Employees = employeeInfos};
    }

    public bool SetEmployeesToContractorData(int managerId, List<ContractorInfo> contractorInfos)
    {
      var employeeIdsList = InvoiceContext.Employees
        .Where(emp => emp.ManagerId == managerId && emp.Fired == false).Select(emp => emp.Id).ToList();

      var enitiesToRemove =
        InvoiceContext.EmployeesContractors.Where(empCon => employeeIdsList.Contains(empCon.EmployeeId)).ToList();
      InvoiceContext.EmployeesContractors.RemoveRange(enitiesToRemove);
      List<EmployeesContractor> addEmployeesContractors = new List<EmployeesContractor>();
      foreach (var contractorInfo in contractorInfos)
      {
        foreach (var employeeId in contractorInfo.EmployeesId)
        {
          addEmployeesContractors.Add(new EmployeesContractor()
          {
            Id = 0,
            EmployeeId = employeeId,
            RootContractorId = contractorInfo.Id
          });
        }
      }
      InvoiceContext.AddRange(addEmployeesContractors);
      return InvoiceContext.SaveChanges() > 0;
    }
  }
}

