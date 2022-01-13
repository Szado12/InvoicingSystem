using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.ViewModel.InvoiceModels;
using Microsoft.AspNetCore.Authorization;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/invoices")]
  [ApiController]
  [Authorize]
  public class InvoiceController : Controller
  {
    private IInvoiceService m_invoiceService;
    private IJWTTokenService m_jwtTokenService;
    private IFileManagmentService m_fileManagmentService;

    public InvoiceController(IInvoiceService invoiceService, IFileManagmentService fileManagmentService, IJWTTokenService iJwtTokenService)
    {
      m_invoiceService = invoiceService;
      m_jwtTokenService = iJwtTokenService;
      m_fileManagmentService = fileManagmentService;
    }

    [HttpGet]
    [Route("InvoiceNumber")]
    public IActionResult CreateInvoiceNumber()
    {
      return Ok(m_invoiceService.CreateInvoiceNumber(DateTime.Now));
    }

    [HttpGet]
    [Route("Id")]
    public IActionResult GetInvoiceById(string id, string type)
    {
      return Ok(m_invoiceService.GetInvoiceById(Int32.Parse(id),
        type,
        m_jwtTokenService.GetUserId(HttpContext.User.Identity as ClaimsIdentity),
        m_jwtTokenService.GetRoleId(HttpContext.User.Identity as ClaimsIdentity)));
    }

    [HttpGet]
    public IActionResult GetInvoices()
    {
      return Ok(m_invoiceService.GetInvoices(m_jwtTokenService.GetUserId(HttpContext.User.Identity as ClaimsIdentity),
        m_jwtTokenService.GetRoleId(HttpContext.User.Identity as ClaimsIdentity)));
    }

    [HttpPost]
    public IActionResult PostInvoice(InvoiceViewModel invoiceViewModel, string action)
    {
      return Ok(m_invoiceService.CreateAcition(invoiceViewModel, action, m_jwtTokenService.GetUserId(HttpContext.User.Identity as ClaimsIdentity),
        m_jwtTokenService.GetRoleId(HttpContext.User.Identity as ClaimsIdentity)));
    }

    [HttpGet]
    [Route("Pdf")]
    public FileContentResult GennerateFile(string id,string type)
    {
      var dataBytes = m_fileManagmentService.CreateFileForInvoice(Int32.Parse(id), type).ToArray();
      var result = new FileContentResult(dataBytes, "application/octet-stream")
      {
        FileDownloadName = $"Export.pdf"
      };

      return result;
    }
  }
}