using FluentValidation;
using VendorContractManagement.Application.DTOs.Expenditure;

namespace VendorContractManagement.Application.Validators.Expenditure;

public class CreateExpenditureValidator
    : AbstractValidator<CreateExpenditureDto>
{
    public CreateExpenditureValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.VendorId)
            .GreaterThan(0);

        RuleFor(x => x.Department)
            .IsInEnum();

        RuleFor(x => x.CostCenter)
            .IsInEnum();

        RuleFor(x => x.Category)
            .IsInEnum();

        RuleFor(x => x.ExpenseType)
            .IsInEnum();

        RuleFor(x => x.InvoiceNumber)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.ExpenseDate)
            .NotEmpty();

        RuleFor(x => x.Currency)
            .IsInEnum();

        RuleFor(x => x.Amount)
            .GreaterThan(0);

        RuleFor(x => x.TaxPercentage)
            .InclusiveBetween(0, 100);

        RuleFor(x => x.PaymentMethod)
            .IsInEnum();

        RuleFor(x => x.Description)
            .MaximumLength(1000);

        RuleFor(x => x.Remarks)
            .MaximumLength(1000);

        RuleFor(x => x.InvoiceDate)
            .LessThanOrEqualTo(DateTime.Today)
            .When(x => x.InvoiceDate.HasValue);

        RuleFor(x => x.DueDate)
            .GreaterThanOrEqualTo(x => x.InvoiceDate)
            .When(x => x.InvoiceDate.HasValue && x.DueDate.HasValue);

        RuleFor(x => x.RecurringMonths)
            .GreaterThan(0)
            .When(x => x.IsRecurring);

        RuleFor(x => x.RecurringMonths)
            .Null()
            .When(x => !x.IsRecurring);
    }
}