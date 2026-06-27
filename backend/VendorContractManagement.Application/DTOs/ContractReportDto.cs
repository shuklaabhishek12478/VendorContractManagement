namespace VendorContractManagement.Application.DTOs
{
    public class ContractReportDto
    {
        public int TotalContracts { get; set; }

        public int ActiveContracts { get; set; }

        public int ExpiredContracts { get; set; }

        public int PendingApprovalContracts { get; set; }

        public int ApprovedContracts { get; set; }

        public int RejectedContracts { get; set; }

        public decimal TotalContractValue { get; set; }
    }
}