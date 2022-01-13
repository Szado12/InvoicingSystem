using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class Employee
    {
        public Employee()
        {
            EmployeesContractors = new HashSet<EmployeesContractor>();
            InverseManager = new HashSet<Employee>();
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Fired { get; set; }
        public int RoleId { get; set; }
        public int CredentialId { get; set; }
        public int? ManagerId { get; set; }

        public virtual Credential Credential { get; set; }
        public virtual Employee Manager { get; set; }
        public virtual Role Role { get; set; }
        public virtual ICollection<EmployeesContractor> EmployeesContractors { get; set; }
        public virtual ICollection<Employee> InverseManager { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
