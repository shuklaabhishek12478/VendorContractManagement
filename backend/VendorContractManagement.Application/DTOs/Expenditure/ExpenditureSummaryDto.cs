namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureSummaryDto
{
    public decimal TotalSpend { get; set; }

    public decimal PaidAmount { get; set; }

    public decimal PendingAmount { get; set; }

    public decimal ForecastAmount { get; set; }

    public decimal Budget { get; set; }

    public decimal RemainingBudget { get; set; }

    public int TotalExpenses { get; set; }

    public int PaidExpenses { get; set; }

    public int PendingExpenses { get; set; }

    public int OverdueExpenses { get; set; }
}