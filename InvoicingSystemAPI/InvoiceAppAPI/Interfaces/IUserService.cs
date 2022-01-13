using System.Collections.Generic;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.User;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Interfaces
{
  public interface IUserService
  {
    UserData Login(UserLoginViewModel loginData);
    bool ChangePassword(UserChangePasswordView changePassword);

    bool Register(UserRegisterViewModel userModel);
    bool EditUser(UserRegisterViewModel userModel);

    List<UserModel> GetUsersList();
    public List<UserModel> GetManagerList();
    List<RoleViewModel> GetRoleList();
    bool FireEmployee(int userId);
  }
}
