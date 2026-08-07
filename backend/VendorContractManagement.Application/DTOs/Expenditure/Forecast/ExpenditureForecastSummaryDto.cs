public class ExpenditureForecastSummaryDto
{
    public int Year { get; set; }

    public decimal CurrentSpend { get; set; }

    public decimal ForecastSpend { get; set; }

    public decimal Budget { get; set; }

    public decimal RemainingBudget { get; set; }

    public decimal BudgetUtilizationPercentage { get; set; }

    public decimal MonthlyBurnRate { get; set; }

    public decimal EstimatedYearEndSpend { get; set; }
}