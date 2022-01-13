using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Internal;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Implementation
{
  public class ProductService : DefaultService, IProductService
  {
    public List<ProductViewForList> GetAllActualProducts()
    {
      return Mapper.Map<List<Product>, List<ProductViewForList>>(InvoiceContext.Products
        .Where(x => x.CurrenVersion == true).ToList());
    }

    public List<ProductViewForList> GetAllActualProductsAndArchived(string list)
    {
      List<int> listOfId = new List<int>();
      foreach (var id in list.Split(','))
      {
        int num;
        if (int.TryParse(id, out num))
        {
          listOfId.Add(num);
        }
      }
      return Mapper.Map<List<Product>, List<ProductViewForList>>(InvoiceContext.Products
        .Where(x => x.CurrenVersion == true || listOfId.Contains(x.Id)).Distinct().ToList());
    }

    public List<Product> GetAllProducts()
    {
      return InvoiceContext.Products.ToList();
    }

    public Product GetProductById(int id)
    {
      return InvoiceContext.Products.SingleOrDefault(x => x.Id == id);
    }

    public List<Product> GetProductsByCatalogNumber(string catalogNumber)
    {
      return InvoiceContext.Products.Where(x => x.CatalogNumber == catalogNumber).ToList();
    }

    public bool AddProduct(Product product)
    {
      product.Id = 0;
      product.CurrenVersion = true;
      InvoiceContext.Products.Add(product);
      return InvoiceContext.SaveChanges() != 0;
    }

    public bool EditProduct(Product product)
    {

      product.CurrenVersion = true;
      if (CheckIsProductUsed(product.Id))
        return EditNotUsedProduct(product);
      InvoiceContext.Products.Where(x => x.Id == product.Id).ForAll(x => x.CurrenVersion = false);
      return AddProduct(product);

    }

    private bool CheckIsProductUsed(int id)
    {
      return InvoiceContext.InvoiceRows.Where(row => row.ProductId == id).ToList().Count <= 0;
    }

    private bool EditNotUsedProduct(Product product)
    {
      var oldProduct = InvoiceContext.Products.First(prod => prod.Id == product.Id);
      InvoiceContext.Entry(oldProduct).CurrentValues.SetValues(product);
      return InvoiceContext.SaveChanges() != 0;
    }

    public bool DeleteProduct(int id)
    {
      if (CheckIsProductUsed(id)) 
        return DeleteNotUsedProduct(id);
      InvoiceContext.Products.Where(x => x.Id == id).ForAll(x => x.CurrenVersion = false);
      return InvoiceContext.SaveChanges() != 0;
    }

    private bool DeleteNotUsedProduct(int id)
    {
      var product = InvoiceContext.Products.First(product => product.Id == id);
      InvoiceContext.Products.Remove(product);
      return InvoiceContext.SaveChanges() != 0;
    }
  }
}
