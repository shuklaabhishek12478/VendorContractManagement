using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs
{
    public class ContractDto
    {
        public int Id { get; set; }

        public string ContractNumber { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;


        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;

        public ContractStatus Status { get; set; }

        public int VendorId { get; set; }

        public string? ApprovedBy { get; set; }

        public DateTime? ApprovedOn { get; set; }

        public string? RejectionReason { get; set; }

        public string? TerminationReason { get; set; }

        public DateTime? TerminatedOn { get; set; }

        public string? TerminatedBy { get; set; }

        public DateTime? SubmittedOn { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }


    }
}