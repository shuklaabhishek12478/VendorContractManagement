using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs.Reports;

public class ReportFilterDto
{
    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    public int? VendorId { get; set; }

    public int? ContractId { get; set; }

    public Department? Department { get; set; }

    public ExpenseCategory? Category { get; set; }

    public PaymentStatus? PaymentStatus { get; set; }

    public ExpenditureStatus? Status { get; set; }

    public bool ExportExcel { get; set; }

    public bool ExportPdf { get; set; }
}