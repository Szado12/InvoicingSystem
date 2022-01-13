using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.EmployeesToContractors;
using InvoiceAppAPI.ViewModel.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/users")]
  [ApiController]
  public class UserController : Controller
  {
    private IUserService m_userService;
    private IJWTTokenService m_JWTTokenService;

    public UserController(IUserService userService, IJWTTokenService jwtTokenService)
    {
      m_userService = userService;
      m_JWTTokenService = jwtTokenService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(UserLoginViewModel userLogin)
    {
      var userData = m_userService.Login(userLogin);
      if (userData == null)
        return Unauthorized();
      var token = await m_JWTTokenService.GenerateToken(userData);
      return Ok(new
      {
        FirstName =  userData.FirstName,
        LastName = userData.LastName,
        JWTToken = token.JWTToken,
        RefreshToken = token.RefreshToken,
        RoleId = userData.RoleId
      });
      
    }

    [HttpDelete]
    [Route("fire")]
    [Authorize(Roles = "1")]
    public async Task<IActionResult> FireEmployee(int userId)
    {
      return Ok(m_userService.FireEmployee(userId));

    }

    [HttpPost]
    [Route("edit")]
    [Authorize(Roles = "1")]
    public async Task<IActionResult> EditUser(UserRegisterViewModel userData)
    {
      return Ok(m_userService.EditUser(userData));
    }

    [HttpPost]
    [Route("register")]
    [Authorize(Roles = "1")]
    public async Task<IActionResult> Register(UserRegisterViewModel userData)
    {
      return Ok(m_userService.Register(userData));
    }

    [HttpPost]
    [Route("restartPassword")]
    [Authorize(Roles = "1")]
    public IActionResult RestartPassword(UserChangePasswordView changePassword)
    {
      return Ok(m_userService.ChangePassword(changePassword));
    }

    [HttpGet]
    [Route("list")]
    [Authorize(Roles = "1")]
    public IActionResult GetUserList()
    {
      return Ok(m_userService.GetUsersList());
    }

    [HttpGet]
    [Route("managers")]
    [Authorize(Roles = "1")]
    public IActionResult GetManagerList()
    {
      return Ok(m_userService.GetManagerList());
    }

    [HttpGet]
    [Route("roles")]
    [Authorize(Roles = "1")]
    public IActionResult GetRolesList()
    {
      return Ok(m_userService.GetRoleList());
    }
  }
}
