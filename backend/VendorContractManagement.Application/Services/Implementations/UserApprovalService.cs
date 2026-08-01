using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations;

public class UserApprovalService : IUserApprovalService
{
    private readonly IUserRepository _userRepository;

    public UserApprovalService(
        IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<UserDto>> GetPendingUsersAsync()
    {
        var users =
            await _userRepository.GetPendingApprovalUsersAsync();

        return users.Select(x => new UserDto
        {
            Id = x.Id,
            FullName = x.FullName,
            Email = x.Email,
            CreatedOn = x.CreatedOn,
            IsActive = x.IsActive
        }).ToList();
    }

    public async Task ApproveUserAsync(
        int userId,
        int roleId,
        int approvedByUserId)
    {
        await _userRepository.ApproveUserAsync(
            userId,
            roleId,
            approvedByUserId);
    }

    public async Task RejectUserAsync(
        int userId,
        string reason,
        int approvedByUserId)
    {
        await _userRepository.RejectUserAsync(
            userId,
            reason,
            approvedByUserId);
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
            return null;

        return new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            IsActive = user.IsActive,
            VendorId = user.VendorId,
            CreatedOn = user.CreatedOn
        };
    }
}