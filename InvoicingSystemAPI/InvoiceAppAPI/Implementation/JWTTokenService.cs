using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel.User;

namespace InvoiceAppAPI.Implementation
{
  public class JWTTokenService : DefaultService, IJWTTokenService
  {
    private readonly byte[] m_key;
    public JWTTokenService(byte[] key)
    {
      m_key = key;
    }
    public async Task<dynamic> GenerateToken(UserData userData)
    {
      if (userData == null)
        return null;
      if (userData.Fired)
        return null;
      
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim(ClaimTypes.NameIdentifier, userData.EmployeeId.ToString()),
          new Claim(ClaimTypes.Role, userData.RoleId.ToString())
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials =
          new SigningCredentials(new SymmetricSecurityKey(m_key), SecurityAlgorithms.HmacSha512Signature)
      };

      var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

      var output = new
      {
        JWTToken = new JwtSecurityTokenHandler().WriteToken(token),
        RefreshToken = GenerateRefreshToken()
      };

      return output;
    }
    
    public int GetUserId(ClaimsIdentity identity)
    {
      return Int32.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
    }

    public int GetRoleId(ClaimsIdentity identity)
    {
      return Int32.Parse(identity.FindFirst(ClaimTypes.Role).Value);
    }

    public string GenerateRefreshToken()
    {
      var randomNumber = new byte[32];
      using (var randomNumberGenrator = RandomNumberGenerator.Create())
      {
        randomNumberGenrator.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
      }
    }
  }
}