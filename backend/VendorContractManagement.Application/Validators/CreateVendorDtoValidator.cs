using FluentValidation;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Validators
{
    public class CreateVendorDtoValidator
        : AbstractValidator<CreateVendorDto>
    {
        public CreateVendorDtoValidator()
        {
            RuleFor(x => x.VendorName)
                .NotEmpty()
                .WithMessage("Vendor Name is required")
                .MaximumLength(100);

            RuleFor(x => x.CompanyName)
                .NotEmpty()
                .WithMessage("Company Name is required");

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Phone)
                .NotEmpty()
                .MinimumLength(10);

            RuleFor(x => x.GSTNumber)
                .NotEmpty();

            RuleFor(x => x.PANNumber)
                .NotEmpty();
        }
    }
}