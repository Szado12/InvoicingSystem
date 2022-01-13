using System.Collections.Generic;
using System.Security.Claims;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel.EmployeesToContractors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/management")]
  [ApiController]
  public class ManagementController : Controller
  {

    private IEmployeesToContractorsService m_EmployeesToContractorsService;
    private IJWTTokenService m_JWTTokenService;
    public ManagementController(IJWTTokenService jwtTokenService, IEmployeesToContractorsService employeesToContractorsService)
    {
      m_JWTTokenService = jwtTokenService;
      m_EmployeesToContractorsService = employeesToContractorsService;
    }

    [HttpGet]
    [Authorize(Roles = "2")]
    public IActionResult GetEmployeesToContractorData()
    {
      return Ok(m_EmployeesToContractorsService.GetEmployeesToContractorData(m_JWTTokenService.GetUserId(HttpContext.User.Identity as ClaimsIdentity)));
    }

    [HttpPost]
    [Authorize(Roles = "2")]
    public IActionResult EditEmployeesToContractorData(List<ContractorInfo> contractorInfos)
    {
      return Ok(m_EmployeesToContractorsService.SetEmployeesToContractorData(m_JWTTokenService.GetUserId(HttpContext.User.Identity as ClaimsIdentity), contractorInfos));
    }
  }
}