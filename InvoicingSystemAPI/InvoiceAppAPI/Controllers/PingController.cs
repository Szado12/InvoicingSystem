using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/connection")]
  [ApiController]
  public class PingController : Controller
  {
    [HttpGet]
    [Route("ping")]
    public IActionResult Ping()
    {
      return Ok();
    }

    [HttpGet]
    [Authorize]
    [Route("testToken")]
    public IActionResult TestToken()
    {
      return Ok();
    }

  }
}
