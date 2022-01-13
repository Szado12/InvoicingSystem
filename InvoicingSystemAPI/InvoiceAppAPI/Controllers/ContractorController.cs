using Microsoft.AspNetCore.Mvc;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/contractors")]
  [ApiController]
  [Authorize]
  public class ContractorController : Controller
  {
    private IContractorService m_contractorService;

    public ContractorController(IContractorService contractorService)
    {
      m_contractorService = contractorService;
    }

    [HttpGet]
    public IActionResult GetContractorMethodsViews()
    {
      return Ok(m_contractorService.GetContractorView());
    }

    [HttpPost]
    [Authorize(Roles = "1,2")]
    public IActionResult PostContractor(ContractorView contractorView, string action)
    {
      return Ok(m_contractorService.CreateAction(contractorView, action));
    }

    [HttpDelete]
    [Authorize(Roles = "1,2")]
    public IActionResult DeleteContractor(int id)
    {
      return Ok(m_contractorService.DeleteContractor(id));
    }
  }
}