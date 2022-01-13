namespace InvoiceAppAPI.Interfaces
{
  public interface IEncryptionService
  {
    byte[] Hash(string data);
  }
}
