using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface IUserApprovalService
{
    Task<List<UserDto>> GetPendingUsersAsync();

    Task ApproveUserAsync(
        int userId,
        int roleId,
        int approvedByUserId);

    Task RejectUserAsync(
        int userId,
        string reason,
        int approvedByUserId);

    Task<UserDto?> GetByIdAsync(int id);
}