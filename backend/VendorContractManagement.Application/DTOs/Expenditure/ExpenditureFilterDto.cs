namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureFilterDto
{
    public string? Keyword { get; set; }

    public int? VendorId { get; set; }

    public int? ContractId { get; set; }

    public int? Department { get; set; }

    public int? CostCenter { get; set; }

    public int? Category { get; set; }

    public int? ExpenseType { get; set; }

    public int? PaymentStatus { get; set; }

    public int? Status { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    public decimal? MinAmount { get; set; }

    public decimal? MaxAmount { get; set; }

    // Future Ready

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 20;

    public string SortBy { get; set; } = "ExpenseDate";

    public bool Descending { get; set; } = true;
}