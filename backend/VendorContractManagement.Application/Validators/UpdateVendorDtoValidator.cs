using FluentValidation;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Validators
{
    public class UpdateVendorDtoValidator
        : AbstractValidator<UpdateVendorDto>
    {
        public UpdateVendorDtoValidator()
        {
            RuleFor(x => x.VendorName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.CompanyName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.GSTNumber)
                .NotEmpty()
                .Length(15);

            RuleFor(x => x.PANNumber)
                .NotEmpty()
                .Length(10);

            RuleFor(x => x.ContactPerson)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Phone)
                .NotEmpty()
                .Matches(@"^[6-9]\d{4}\s?\d{5}$")
                .WithMessage("Phone number must be a valid 10-digit Indian mobile number.");

            RuleFor(x => x.Address)
                .NotEmpty()
                .MaximumLength(500);

            RuleFor(x => x.BankName)
    .NotEmpty()
    .MaximumLength(100);

            RuleFor(x => x.AccountHolderName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.AccountNumber)
                .NotEmpty()
                .Matches(@"^[0-9]{9,18}$")
                .WithMessage("Account Number must be between 9 and 18 digits.");

            RuleFor(x => x.IFSCCode)
                .NotEmpty()
                .Matches(@"^[A-Z]{4}0[A-Z0-9]{6}$")
                .WithMessage("Invalid IFSC Code.");

            RuleFor(x => x.BranchName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.SwiftCode)
                .Matches(@"^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$")
                .When(x => !string.IsNullOrWhiteSpace(x.SwiftCode));

            RuleFor(x => x.PaymentMethod)
                .NotNull();

            RuleFor(x => x.PaymentTerms)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.PreferredCurrency)
                .NotNull();
        }
    }
}