using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class DashboardDto
    {
        public int TotalVendors { get; set; }

        public int TotalContracts { get; set; }

        public int ActiveContracts { get; set; }

        public int ExpiredContracts { get; set; }

        public int ExpiringSoonContracts { get; set; }
        public int TotalDocuments { get; set; }

        public int TotalAuditLogs { get; set; }

        public int PendingApprovalContracts { get; set; }

        public int ApprovedContracts { get; set; }

        public int RejectedContracts { get; set; }

        public int TotalRenewals { get; set; }

        public int PendingRenewals { get; set; }

        public int ApprovedRenewals { get; set; }

        public int RejectedRenewals { get; set; }
    }
}
