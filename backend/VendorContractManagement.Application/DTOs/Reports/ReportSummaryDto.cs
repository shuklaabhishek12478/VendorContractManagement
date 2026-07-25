namespace VendorContractManagement.Application.DTOs.Reports;

public class ReportSummaryDto
{
    public decimal TotalSpend { get; set; }

    public decimal PaidAmount { get; set; }

    public decimal PendingAmount { get; set; }

    public int TotalContracts { get; set; }

    public int ActiveContracts { get; set; }

    public int TotalVendors { get; set; }

    public int ActiveVendors { get; set; }

    public int TotalExpenses { get; set; }

    public int PaidExpenses { get; set; }

    public int PendingExpenses { get; set; }
}