namespace VendorContractManagement.Application.DTOs.Reports;

public class ContractReportDto
{
    public int ContractId { get; set; }

    public string ContractNumber { get; set; } = string.Empty;

    public string VendorName { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal ContractValue { get; set; }
}