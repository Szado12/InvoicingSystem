using System.Collections.Generic;
using System.Linq;
using InvoiceAppAPI.Interfaces;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Implementation
{
  public class PaymentMethodService : DefaultService, IPaymentMethodService
  {
    public List<PaymentMethodViewForTypeahead> GetPaymentMethodsViewForTypeaheads()
    {
      return Mapper.Map<List<PaymentMethod>, List<PaymentMethodViewForTypeahead>>(
        InvoiceContext.PaymentMethods.ToList());
    }
  }
}
