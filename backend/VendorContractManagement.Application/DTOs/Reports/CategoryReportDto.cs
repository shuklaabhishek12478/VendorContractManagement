namespace VendorContractManagement.Application.DTOs.Reports;

public class CategoryReportDto
{
    public string Category { get; set; } = string.Empty;

    public decimal Spend { get; set; }

    public int Expenses { get; set; }
}