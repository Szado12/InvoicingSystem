using System;
using System.Collections.Generic;
using System.Linq;
using CSharpFunctionalExtensions;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.User;
using Microsoft.EntityFrameworkCore;
namespace InvoiceAppAPI.Implementation
{
  public class UserService : DefaultService, IUserService
  {
    private IEncryptionService m_encryptionService;

    public UserService(IEncryptionService encryptionService)
    {
      m_encryptionService = encryptionService;
    }

    public UserData Login(UserLoginViewModel loginData)
    {
      var hashedPassword = m_encryptionService.Hash(loginData.Password);
      Employee employee = InvoiceContext.Employees.Include(x => x.Credential)
        .FirstOrDefault(log => log.Credential.Login == loginData.Login && log.Credential.Password == hashedPassword && !log.Fired);
      return employee == null ? null : Mapper.Map<Employee, UserData>(employee);
    }

    public bool ChangePassword(UserChangePasswordView changePassword)
    {
      Maybe<Credential> userLogin =
        InvoiceContext.Credentials.First(x=>x.Id == InvoiceContext.Employees.FirstOrDefault(y=>y.Id == changePassword.EmployeeID).CredentialId);
      userLogin.Execute((user) =>
      {
        user.Password = m_encryptionService.Hash(changePassword.Password);
      });
      return InvoiceContext.SaveChanges() > 0;
    }

    public bool Register(UserRegisterViewModel userModel)
    {
      Credential login = new Credential()
      {
        Id = 0,
        Password = m_encryptionService.Hash(userModel.Password),
        Login = $"{userModel.FirstName}.{userModel.LastName}"
      };
      InvoiceContext.Credentials.Add(login);
      InvoiceContext.SaveChanges();
      try
      {
        Employee employee = new Employee()
        {
          Id = 0,
          CredentialId = login.Id,
          RoleId = userModel.Role.Id,
          Fired = false,
          ManagerId = userModel.Manager?.Id,
          FirstName = userModel.FirstName,
          LastName = userModel.LastName
        };
        InvoiceContext.Employees.Add(employee);
        return InvoiceContext.SaveChanges() > 0;
      }
      catch (Exception e)
      {
        InvoiceContext.Credentials.Remove(login);
        InvoiceContext.SaveChanges();
        throw e;
      }
    }

    public bool EditUser(UserRegisterViewModel userModel)
    {
      Maybe<Employee> employee =
        InvoiceContext.Employees.Include(emp => emp.Credential).First(emp => emp.Id == userModel.Id);
      employee.Execute((emp) =>
      {
        emp.Fired = userModel.Fired;
        emp.RoleId = userModel.Role.Id;
        emp.ManagerId = userModel.Manager?.Id;
        emp.FirstName = userModel.FirstName;
        emp.LastName = userModel.LastName;
        emp.Credential.Login = $"{userModel.FirstName}.{userModel.LastName}";
      });
      return InvoiceContext.SaveChanges() > 0;
    }

    public List<UserModel> GetUsersList()
    {
      return Mapper.Map<List<Employee>, List<UserModel>>(InvoiceContext.Employees.Include(emp => emp.Credential).Include(emp=>emp.Role).ToList());
    }
    public List<UserModel> GetManagerList()
    {
      return Mapper.Map<List<Employee>, List<UserModel>>(
        InvoiceContext.Employees
          .Include(emp => emp.Credential)
          .Include(emp => emp.Role)
          .Where(emp => emp.Fired == false && emp.Role.Name == "Manager")
          .ToList());
    }
    public List<RoleViewModel> GetRoleList()
    {
      return Mapper.Map<List<Role>, List<RoleViewModel>>(InvoiceContext.Roles.ToList());
    }

    public bool FireEmployee(int userId)
    {
      var userToFire = InvoiceContext.Employees.Include(emp => emp.Id == userId).Include(emp=>emp.Credential).First();
      userToFire.Fired = true;
      InvoiceContext.Credentials.Remove(userToFire.Credential);
      return InvoiceContext.SaveChanges() > 0;
    }
  }
}
