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
                .Matches(@"^[0-9]{10}$");

            RuleFor(x => x.Address)
                .NotEmpty()
                .MaximumLength(500);

            RuleFor(x => x.BankName)
                .MaximumLength(100);

            RuleFor(x => x.AccountHolderName)
                .MaximumLength(100);

            RuleFor(x => x.AccountNumber)
                .Matches(@"^[0-9]{9,18}$")
                .When(x => !string.IsNullOrWhiteSpace(x.AccountNumber))
                .WithMessage("Account Number must be between 9 and 18 digits.");

            RuleFor(x => x.IFSCCode)
                .Matches(@"^[A-Z]{4}0[A-Z0-9]{6}$")
                .When(x => !string.IsNullOrWhiteSpace(x.IFSCCode))
                .WithMessage("Invalid IFSC Code.");

            RuleFor(x => x.BranchName)
                .MaximumLength(100);

            RuleFor(x => x.SwiftCode)
                .Matches(@"^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$")
                .When(x => !string.IsNullOrWhiteSpace(x.SwiftCode))
                .WithMessage("Invalid SWIFT Code.");

            RuleFor(x => x.PaymentTerms)
                .MaximumLength(100);
        }
    }
}