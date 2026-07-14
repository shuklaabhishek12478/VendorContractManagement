using FluentValidation;
using VendorContractManagement.Application.DTOs.Role;

namespace VendorContractManagement.Application.Validators.Role;

public class UpdateRoleValidator : AbstractValidator<UpdateRoleDto>
{
    public UpdateRoleValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Description)
            .MaximumLength(300);

        RuleFor(x => x.Color)
            .MaximumLength(20);

        RuleFor(x => x.Icon)
            .MaximumLength(100);

        RuleFor(x => x.Priority)
            .GreaterThanOrEqualTo(1);
    }
}