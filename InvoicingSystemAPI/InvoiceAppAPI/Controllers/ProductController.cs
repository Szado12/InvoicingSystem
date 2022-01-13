using System;
using Microsoft.AspNetCore.Mvc;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace InvoiceAppAPI.Controllers
{
  [Route("api/products")]
  [ApiController]
  [Authorize]
  public class ProductController : Controller
  {
    private IProductService m_ProductService;

    public ProductController(IProductService productService)
    {
      m_ProductService = productService;
    }



    [HttpGet]
    public IActionResult GetProducts(string list)
    {
      var result = String.IsNullOrEmpty(list)
        ? m_ProductService.GetAllActualProducts()
        : m_ProductService.GetAllActualProductsAndArchived(list);
      return Ok(result);
    }

    [HttpPost]
    public IActionResult InsertProduct([FromBody] Product product,string action)
    {
      return Ok(action == "add" ? m_ProductService.AddProduct(product) : m_ProductService.EditProduct(product));
    }

    [HttpDelete]
    public IActionResult DeleteProduct(int id)
    {
      return Ok(m_ProductService.DeleteProduct(id));
    }
  }
}
