using InvoiceAppAPI.Models;
using System.Collections.Generic;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Interfaces
{
  public interface IProductService
  {
    List<ProductViewForList> GetAllActualProducts();
    List<ProductViewForList> GetAllActualProductsAndArchived(string list);
    List<Product> GetAllProducts();
    Product GetProductById(int id);
    List<Product> GetProductsByCatalogNumber(string catalogNumber);

    bool AddProduct(Product product);
    bool EditProduct(Product product);
    bool DeleteProduct(int id);
  }
}
