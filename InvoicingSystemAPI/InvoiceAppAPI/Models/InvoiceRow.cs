using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class InvoiceRow
    {
        public int Id { get; set; }
        public decimal NumberOfProducts { get; set; }
        public decimal Discount { get; set; }
        public int ProductId { get; set; }
        public int InvoiceId { get; set; }

        public virtual Invoice Invoice { get; set; }
        public virtual Product Product { get; set; }
    }
}
