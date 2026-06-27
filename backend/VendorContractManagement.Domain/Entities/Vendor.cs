using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities
{
    public class Vendor : BaseEntity
    {
        public string VendorName { get; set; } = string.Empty;

        public string CompanyName { get; set; } = string.Empty;

        public string GSTNumber { get; set; } = string.Empty;

        public string PANNumber { get; set; } = string.Empty;

        public string ContactPerson { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public ICollection<Contract> Contracts { get; set; }
            = new List<Contract>();

        public bool IsDeleted { get; set; } = false;

        public ICollection<User> Users { get; set; }
             = new List<User>();
    }
}
