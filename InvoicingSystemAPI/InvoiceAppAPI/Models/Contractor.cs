using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class Contractor
    {
        public Contractor()
        {
            EmployeesContractors = new HashSet<EmployeesContractor>();
            InverseRootContractor = new HashSet<Contractor>();
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Nip { get; set; }
        public bool CurrentVersion { get; set; }
        public int? RootContractorId { get; set; }

        public virtual Contractor RootContractor { get; set; }
        public virtual ICollection<EmployeesContractor> EmployeesContractors { get; set; }
        public virtual ICollection<Contractor> InverseRootContractor { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
