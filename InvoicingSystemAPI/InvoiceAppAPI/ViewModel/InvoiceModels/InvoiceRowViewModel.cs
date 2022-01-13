namespace InvoiceAppAPI.ViewModel.InvoiceModels
{
  public class InvoiceRowViewModel
  {
    public int Id { get; set; }
    public decimal NumberOfProducts { get; set; }
    public decimal Discount { get; set; }
    public virtual ProductViewModel Product { get; set; }
  }
}
