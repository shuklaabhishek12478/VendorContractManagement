using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureFilterDto
{
    public string? Keyword { get; set; }

    public int? VendorId { get; set; }

    public int? ContractId { get; set; }

    public Department? Department { get; set; }

    public CostCenter? CostCenter { get; set; }

    public ExpenseCategory? Category { get; set; }

    public ExpenseType? ExpenseType { get; set; }

    public PaymentStatus? PaymentStatus { get; set; }

    public ExpenditureStatus? Status { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    public decimal? MinAmount { get; set; }

    public decimal? MaxAmount { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 20;

    public string SortBy { get; set; } = "ExpenseDate";

    public bool Descending { get; set; } = true;
}