namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureDashboardDto
{
    public ExpenditureSummaryDto Summary { get; set; }
        = new();

    public List<MonthlySpendDto> MonthlySpend { get; set; }
        = new();

    public List<DepartmentSpendDto> DepartmentSpend { get; set; }
        = new();

    public List<VendorSpendDto> VendorSpend { get; set; }
        = new();

    public List<CategorySpendDto> CategorySpend { get; set; }
        = new();
}