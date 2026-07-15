using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Role;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface IRoleService
{
    Task<List<RoleDto>> GetAllAsync();

    Task<RoleDto?> GetByIdAsync(int id);

    Task<List<RoleDto>> SearchAsync(RoleFilterDto filter);

    Task<RoleDto> CreateAsync(CreateRoleDto dto);

    Task<RoleDto> UpdateAsync(int id, UpdateRoleDto dto);

    Task DeleteAsync(int id);

    Task ActivateAsync(int id);

    Task DeactivateAsync(int id);

    Task AssignPermissionsAsync(
        int roleId,
        AssignPermissionsDto dto);

    Task<List<string>> GetPermissionsAsync(int roleId);

    Task<RoleDto> CloneAsync(
        int roleId,
        string newRoleName);
    Task AssignUsersAsync(
    int roleId,
    AssignUsersToRoleDto dto);

    Task<List<UserDto>> GetUsersAsync(
        int roleId);
    Task RemoveUserAsync(
    int roleId,
    int userId);

    Task<RoleStatisticsDto> GetStatisticsAsync();

    Task<List<RoleDto>> GetActiveRolesAsync();
    Task<List<RoleLookupDto>> GetLookupAsync();

    Task<bool> ExistsAsync(string roleName, int? excludeId = null);
}