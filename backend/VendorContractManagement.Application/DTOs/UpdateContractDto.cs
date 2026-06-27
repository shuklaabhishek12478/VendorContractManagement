using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs
{
    public class UpdateContractDto
    {
        public string ContractNumber { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;

       // public ContractStatus Status { get; set; }

        public int VendorId { get; set; }
    }
}