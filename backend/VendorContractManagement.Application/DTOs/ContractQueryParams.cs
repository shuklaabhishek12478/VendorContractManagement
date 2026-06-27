using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs
{
    public class ContractQueryParams
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public ContractStatus? Status { get; set; }

        public int? VendorId { get; set; }
    }
}