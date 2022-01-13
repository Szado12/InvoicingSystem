using InvoiceAppAPI.Models;

namespace InvoiceAppAPI.ViewModel.User
{
  public class UserModel
  {
    public int Id { get; set; }
    public RoleViewModel Role { get; set; }
    public UserModel Manager { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Fired { get; set; }
  }
}
