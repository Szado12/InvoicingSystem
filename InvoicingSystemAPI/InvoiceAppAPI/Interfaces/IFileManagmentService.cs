using System.IO;

namespace InvoiceAppAPI.Interfaces
{
  public interface IFileManagmentService
  {
    MemoryStream CreateFileForInvoice(int invoiceID,string type);
  }
}
