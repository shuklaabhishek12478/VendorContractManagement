using FluentValidation;
using VendorContractManagement.Application.DTOs.Role;

namespace VendorContractManagement.Application.Validators.Role;

public class AssignPermissionValidator
    : AbstractValidator<AssignPermissionsDto>
{
    public AssignPermissionValidator()
    {
        RuleFor(x => x.PermissionIds)

            .NotNull()

            .NotEmpty()

            .Must(x => x.Distinct().Count() == x.Count)

            .WithMessage(
                "Duplicate permissions are not allowed.");
    }
}