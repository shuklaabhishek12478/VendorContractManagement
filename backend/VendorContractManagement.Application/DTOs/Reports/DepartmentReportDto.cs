namespace VendorContractManagement.Application.DTOs.Reports;

public class DepartmentReportDto
{
    public string Department { get; set; } = string.Empty;

    public decimal Spend { get; set; }

    public int Expenses { get; set; }
}