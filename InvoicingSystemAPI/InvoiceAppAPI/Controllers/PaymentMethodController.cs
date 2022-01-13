using InvoiceAppAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/paymentMethods")]
  [ApiController]
  [Authorize]
  public class PaymentMethodController : Controller
  {
    private IPaymentMethodService m_paymentMethodService;

    public PaymentMethodController(IPaymentMethodService paymentMethodService)
    {
      m_paymentMethodService = paymentMethodService;
    }

    [HttpGet]
    public IActionResult GetPaymentMethodsViews()
    {
      return Ok(m_paymentMethodService.GetPaymentMethodsViewForTypeaheads());
    }
  }
}