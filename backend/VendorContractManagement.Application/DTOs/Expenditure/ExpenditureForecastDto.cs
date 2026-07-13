namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureForecastDto
{
    public int Year { get; set; }

    public decimal CurrentSpend { get; set; }

    public decimal ForecastSpend { get; set; }

    public decimal Budget { get; set; }

    public decimal RemainingBudget { get; set; }

    public decimal BudgetUtilizationPercentage { get; set; }
}