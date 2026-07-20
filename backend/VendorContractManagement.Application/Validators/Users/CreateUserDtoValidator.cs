using FluentValidation;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Validators.Users;

public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserDtoValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6)
            .MaximumLength(100);

        RuleFor(x => x.VendorId)
            .GreaterThan(0)
            .When(x => x.VendorId.HasValue);

        RuleFor(x => x.RoleIds)
            .NotEmpty()
            .WithMessage("At least one role must be assigned.");
    }
}