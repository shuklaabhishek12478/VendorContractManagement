using FluentValidation;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Validators
{
    public class UpdateContractDtoValidator
        : AbstractValidator<UpdateContractDto>
    {
        public UpdateContractDtoValidator()
        {
           /* RuleFor(x => x.ContractNumber)
                .NotEmpty()
                .MaximumLength(100);*/

            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.ContractValue)
                .GreaterThan(0);

            RuleFor(x => x.StartDate)
                .NotEmpty();

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .GreaterThan(x => x.StartDate)
                .WithMessage("End Date must be greater than Start Date");

            RuleFor(x => x.VendorId)
                .GreaterThan(0);

            RuleFor(x => x.Description)
                .MaximumLength(1000);
        }
    }
}