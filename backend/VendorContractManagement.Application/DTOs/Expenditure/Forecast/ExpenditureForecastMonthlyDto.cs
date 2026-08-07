public class ExpenditureForecastMonthlyDto
{
    public string Month { get; set; } = string.Empty;

    public decimal ActualSpend { get; set; }

    public decimal ForecastSpend { get; set; }
}