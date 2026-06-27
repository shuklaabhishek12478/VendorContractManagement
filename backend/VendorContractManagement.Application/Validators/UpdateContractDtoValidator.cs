using FluentValidation;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Validators
{
    public class UpdateContractDtoValidator
        : AbstractValidator<UpdateContractDto>
    {
        public UpdateContractDtoValidator()
        {
            RuleFor(x => x.ContractNumber)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.ContractValue)
                .GreaterThan(0);

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate);

            RuleFor(x => x.VendorId)
                .GreaterThan(0);

            RuleFor(x => x.Description)
                .MaximumLength(1000);
        }
    }
}