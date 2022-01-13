using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class Product
    {
        public Product()
        {
            InvoiceRows = new HashSet<InvoiceRow>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string MeasurementUnits { get; set; }
        public string CatalogNumber { get; set; }
        public decimal PriceNetto { get; set; }
        public int Vat { get; set; }
        public string Description { get; set; }
        public bool CurrenVersion { get; set; }

        public virtual ICollection<InvoiceRow> InvoiceRows { get; set; }
    }
}
