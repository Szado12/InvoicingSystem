using System.Collections.Generic;
using InvoiceAppAPI.ViewModel;

namespace InvoiceAppAPI.Interfaces
{
  public interface IPaymentMethodService
  {
    List<PaymentMethodViewForTypeahead> GetPaymentMethodsViewForTypeaheads();
  }
}
