using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs
{
    public class ContractReportFilterDto
    {
        public ContractStatus? Status { get; set; }

        public int? VendorId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public decimal? MinContractValue { get; set; }

        public decimal? MaxContractValue { get; set; }
    }
}