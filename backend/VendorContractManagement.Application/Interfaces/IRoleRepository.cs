using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces;

public interface IRoleRepository
{
    Task<List<Role>> GetAllAsync();

    Task<Role?> GetByIdAsync(int id);

    Task<Role?> GetByNameAsync(string name);

    Task<Role> AddAsync(Role role);

    Task UpdateAsync(Role role);

    Task DeleteAsync(Role role);

    Task<bool> ExistsAsync(string name);

    Task<List<Role>> SearchAsync(RoleFilterDto filter);

    Task<int> CountUsersAsync(int roleId);

    Task<int> CountPermissionsAsync(int roleId);

    Task AssignPermissionsAsync(
        int roleId,
        List<int> permissionIds);

    Task<List<Permission>> GetPermissionsAsync(int roleId);

    Task<bool> ExistsAsync(string name, int excludeRoleId);
    Task<Role> CloneRoleAsync(
        int roleId,
        string newRoleName);
    Task AssignUsersAsync(
    int roleId,
    List<int> userIds);

    Task<List<User>> GetUsersAsync(
        int roleId);

    Task RemoveUserAsync(
    int roleId,
    int userId);

    Task<RoleStatisticsDto> GetStatisticsAsync();

    Task<List<Role>> GetActiveRolesAsync();

    Task<bool> ExistsAsync(string roleName, int? excludeId = null);

    Task<Role?> GetForPermissionMatrixAsync(int roleId);

    Task SavePermissionMatrixAsync(
        int roleId,
        List<int> permissionIds);
}