using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Common;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Domain.Entities
{
    public class Contract : BaseEntity
    {
        public string ContractNumber { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;

        public ContractStatus Status { get; set; }

        public int VendorId { get; set; }

        public Vendor Vendor { get; set; } = null!;

        public ICollection<Document> Documents { get; set; }
             = new List<Document>();

        public bool IsDeleted { get; set; } = false;

        public string? ApprovedBy { get; set; }

        public DateTime? ApprovedOn { get; set; }

        public string? RejectionReason { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public int? ParentContractId { get; set; }

        public Contract? ParentContract { get; set; }

        public ICollection<Contract> Renewals { get; set; }
    = new List<Contract>();

        public bool IsRenewal { get; set; }

        public DateTime? RenewalRequestedOn { get; set; }

        public DateTime? RenewalApprovedOn { get; set; }

        public string? RenewalApprovedBy { get; set; }

        public string? TerminationReason { get; set; }

        public DateTime? TerminatedOn { get; set; }

        public string? TerminatedBy { get; set; }
        public bool IsActive { get; set; }  = true;

    }
}