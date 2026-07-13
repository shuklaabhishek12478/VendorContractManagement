using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs.Expenditure;

public class ExpenditureDto
{
    public int Id { get; set; }

    public string ExpenseNumber { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public int VendorId { get; set; }

    public string VendorName { get; set; } = string.Empty;

    public int? ContractId { get; set; }

    public string? ContractNumber { get; set; }

    public Department Department { get; set; }

    public CostCenter CostCenter { get; set; }

    public ExpenseCategory Category { get; set; }

    public ExpenseType ExpenseType { get; set; }

    public DateTime ExpenseDate { get; set; }

    public string InvoiceNumber { get; set; } = string.Empty;

    public string? PurchaseOrderNumber { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public DateTime? DueDate { get; set; }

    public Currency Currency { get; set; }

    public decimal Amount { get; set; }

    public decimal TaxPercentage { get; set; }

    public decimal TaxAmount { get; set; }

    public decimal TotalAmount { get; set; }

    public PaymentStatus PaymentStatus { get; set; }

    public PaymentMethod PaymentMethod { get; set; }

    public ExpenditureStatus Status { get; set; }

    public string Description { get; set; } = string.Empty;

    public string? Remarks { get; set; }

    public bool IsRecurring { get; set; }

    public int? RecurringMonths { get; set; }

    public bool IsForecasted { get; set; }

    public DateTime CreatedOn { get; set; }
}