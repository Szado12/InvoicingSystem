using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class PaymentMethod
    {
        public PaymentMethod()
        {
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool DateNeeded { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
