namespace VendorContractManagement.Application.DTOs.Reports;

public class MonthlyReportDto
{
    public string Month { get; set; } = string.Empty;

    public decimal Spend { get; set; }

    public int Contracts { get; set; }

    public int Vendors { get; set; }
}