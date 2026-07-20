using FluentValidation;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;

namespace VendorContractManagement.Application.Validators.Users;

public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
{
    public UpdateUserDtoValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.VendorId)
            .GreaterThan(0)
            .When(x => x.VendorId.HasValue);

        RuleFor(x => x.RoleIds)
            .NotEmpty()
            .WithMessage("At least one role must be assigned.");
    }
}