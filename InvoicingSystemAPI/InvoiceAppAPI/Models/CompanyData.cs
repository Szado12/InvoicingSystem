using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class CompanyData
    {
        public CompanyData()
        {
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string Nip { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public bool CurrentVersion { get; set; }
        public string City { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
