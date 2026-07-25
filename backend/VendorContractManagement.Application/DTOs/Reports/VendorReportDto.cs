namespace VendorContractManagement.Application.DTOs.Reports;

public class VendorReportDto
{
    public int VendorId { get; set; }

    public string VendorName { get; set; } = string.Empty;

    public decimal Spend { get; set; }

    public int Contracts { get; set; }

    public int Expenses { get; set; }

    public DateTime CreatedOn { get; set; }
}