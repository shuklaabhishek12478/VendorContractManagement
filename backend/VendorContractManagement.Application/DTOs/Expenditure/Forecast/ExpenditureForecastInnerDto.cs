public class ExpenditureForecastInnerDto
{
    public ExpenditureForecastSummaryDto Summary { get; set; }
        = new();

    public List<ExpenditureForecastMonthlyDto> MonthlyForecast { get; set; }
        = new();

    public List<ExpenditureForecastVendorDto> VendorForecast { get; set; }
        = new();

    public List<ExpenditureForecastCategoryDto> CategoryForecast { get; set; }
        = new();

    public List<ExpenditureForecastDepartmentDto> DepartmentForecast { get; set; }
        = new();
}