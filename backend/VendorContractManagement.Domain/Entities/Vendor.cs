using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Common;
using VendorContractManagement.Domain.Enums;

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

        public string? BankName { get; set; }

        public string? AccountHolderName { get; set; }

        public string? AccountNumber { get; set; }

        public string? IFSCCode { get; set; }

        public string? BranchName { get; set; }

        public string? SwiftCode { get; set; }

        public string? PaymentTerms { get; set; }

        public Currency? PreferredCurrency { get; set; }

        public PaymentMethod? PaymentMethod { get; set; }
        public ICollection<User> Users { get; set; }
             = new List<User>();

        public ICollection<VendorDocument> VendorDocuments { get; set; }
        = new List<VendorDocument>();
    }
}
