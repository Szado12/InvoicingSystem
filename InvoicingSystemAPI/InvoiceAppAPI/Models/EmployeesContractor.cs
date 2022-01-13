using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class EmployeesContractor
    {
        public int EmployeeId { get; set; }
        public int Id { get; set; }
        public int RootContractorId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Contractor RootContractor { get; set; }
    }
}
