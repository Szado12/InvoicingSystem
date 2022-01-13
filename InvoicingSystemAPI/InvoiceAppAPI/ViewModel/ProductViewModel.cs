namespace InvoiceAppAPI.ViewModel
{
  public class ProductViewModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string MeasurementUnits { get; set; }
    public string CatalogNumber { get; set; }
    public decimal PriceNetto { get; set; }
    public int Vat { get; set; }
    public string Description { get; set; }
    public bool CurrenVersion { get; set; }
  }
}
