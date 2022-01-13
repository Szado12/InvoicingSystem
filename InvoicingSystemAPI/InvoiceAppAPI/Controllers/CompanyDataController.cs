using Microsoft.AspNetCore.Mvc;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/CompanyData")]
  [ApiController]
  [Authorize]
  public class CompanyDataController : Controller
  {
    private ICompanyDataService m_companyDataService;

    public CompanyDataController(ICompanyDataService companyDataService)
    {
      m_companyDataService = companyDataService;
    }

    [HttpGet]
    public IActionResult GetCompanyData()
    {
      return Ok(m_companyDataService.GetCurrentCompanyData());
    }

    [HttpPost]
    [Authorize(Roles = "1")]
    public IActionResult EditCompanyData(CompanyDataViewModel companyDataViewModel)
    {
      return Ok(m_companyDataService.EditCompanyData(companyDataViewModel));
    }
  }
}
