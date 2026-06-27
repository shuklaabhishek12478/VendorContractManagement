namespace VendorContractManagement.Application.Interfaces
{
    public interface IUserContextService
    {
        string UserId { get; }

        string? Email { get; }

        string? Role { get; }

        int? VendorId { get; }
    }
}