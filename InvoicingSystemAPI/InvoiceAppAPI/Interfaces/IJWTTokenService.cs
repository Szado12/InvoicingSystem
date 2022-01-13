using System.Security.Claims;
using System.Threading.Tasks;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.User;

namespace InvoiceAppAPI.Interfaces
{
  public interface IJWTTokenService
  {
    public Task<dynamic> GenerateToken(UserData userData);
    public int GetUserId(ClaimsIdentity identity);
    public int GetRoleId(ClaimsIdentity identity);

    public string GenerateRefreshToken();

  }
}
