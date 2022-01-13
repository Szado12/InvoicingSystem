using System;
using System.Security.Cryptography;
using System.Text;
using InvoiceAppAPI.Interfaces;

namespace InvoiceAppAPI.Implementation
{
  public class EncryptionService : IEncryptionService
  {
    public byte[] Hash(string data)
    {
      Byte[] input = Encoding.UTF8.GetBytes(data);
      SHA512 shaE = new SHA512Managed();
      Byte[] hashed = shaE.ComputeHash(input);
      return hashed;
    }
  }
}
