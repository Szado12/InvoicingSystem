namespace InvoiceAppAPI.ViewModel.User
{
  /// <summary>
  /// Class returned to client after logging in
  /// </summary>
  public class UserData
  {
    public int EmployeeId { get; set; }
    public string Login { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int RoleId { get; set; }
    public bool Fired { get; set; }
  }
}
