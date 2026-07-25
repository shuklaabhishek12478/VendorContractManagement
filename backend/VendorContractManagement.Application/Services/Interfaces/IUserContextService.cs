namespace VendorContractManagement.Application.Interfaces
{
    public interface IUserContextService
    {
        int? UserId { get; }

        string? Email { get; }

        string? Role { get; }

        int? VendorId { get; }
    }
}