using System;
using System.Collections.Generic;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.InvoiceModels;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceAppAPI.Interfaces
{
  public interface IInvoiceService
  {
    string CreateInvoiceNumber(DateTime date);
    Object GetInvoiceById(int id, string type, int employeeId, int roleId);
    List<InvoiceListViewModel> GetInvoices(int employeeId,int roleId);
    int CreateAcition(InvoiceViewModel invoiceViewModel, string action, int employeeId, int roleId);
  }
}
