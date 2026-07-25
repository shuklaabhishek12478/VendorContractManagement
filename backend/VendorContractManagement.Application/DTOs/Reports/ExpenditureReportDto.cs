namespace VendorContractManagement.Application.DTOs.Reports;

public class ExpenditureReportDto
{
    public int ExpenditureId { get; set; }

    public string ExpenseNumber { get; set; } = string.Empty;

    public string VendorName { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public decimal TaxAmount { get; set; }

    public decimal TotalAmount { get; set; }

    public DateTime ExpenseDate { get; set; }
}