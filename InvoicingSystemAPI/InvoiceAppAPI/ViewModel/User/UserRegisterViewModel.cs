using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvoiceAppAPI.Models;

namespace InvoiceAppAPI.ViewModel.User
{
  public class UserRegisterViewModel
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Fired { get; set; }
    public RoleViewModel Role { get; set; }
    public UserModel Manager { get; set; }

    public string Password { get; set; }
  }
}
