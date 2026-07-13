namespace VendorContractManagement.Application.DTOs.Expenditure;

public class MonthlySpendDto
{
    public string Month { get; set; } = string.Empty;

    public decimal Actual { get; set; }

    public decimal Forecast { get; set; }
}