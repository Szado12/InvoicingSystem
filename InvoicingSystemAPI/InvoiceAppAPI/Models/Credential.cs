using System;
using System.Collections.Generic;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class Credential
    {
        public Credential()
        {
            Employees = new HashSet<Employee>();
        }

        public string Login { get; set; }
        public int Id { get; set; }
        public byte[] Password { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
