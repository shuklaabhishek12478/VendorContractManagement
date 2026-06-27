namespace VendorContractManagement.Application.DTOs
{
    public class AnalyticsDto
    {
        public int TotalContracts { get; set; }

        public int ActiveContracts { get; set; }

        public int PendingApprovalContracts { get; set; }

        public int ExpiredContracts { get; set; }

        public decimal TotalContractValue { get; set; }

        public decimal ActiveContractValue { get; set; }

        public int ExpiringIn30Days { get; set; }

        public int RenewalsThisMonth { get; set; }

        public int TotalRenewals { get; set; }

        public int PendingRenewals { get; set; }
        public int ApprovedRenewals { get; set; }

        public int ActiveRenewals { get; set; }
        public int RejectedRenewals { get; set; }
       
    }
}