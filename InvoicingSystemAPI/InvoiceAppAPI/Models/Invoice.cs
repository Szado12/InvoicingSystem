using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceRows = new HashSet<InvoiceRow>();
        }

        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public string InvoiceNumber { get; set; }
        public bool CurrentVersion { get; set; }
        public int ContractorId { get; set; }
        public int EmployeeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int CompanyDataId { get; set; }

        public virtual CompanyData CompanyData { get; set; }
        public virtual Contractor Contractor { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }
        public virtual ICollection<InvoiceRow> InvoiceRows { get; set; }
    }
}
