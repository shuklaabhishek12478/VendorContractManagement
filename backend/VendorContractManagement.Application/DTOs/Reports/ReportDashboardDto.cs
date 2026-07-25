namespace VendorContractManagement.Application.DTOs.Reports;

public class ReportDashboardDto
{
    public ReportSummaryDto Summary { get; set; } = new();

    public List<MonthlyReportDto> MonthlySpend { get; set; } = new();

    public List<VendorReportDto> VendorSpend { get; set; } = new();

    public List<DepartmentReportDto> DepartmentSpend { get; set; } = new();

    public List<CategoryReportDto> CategorySpend { get; set; } = new();
}