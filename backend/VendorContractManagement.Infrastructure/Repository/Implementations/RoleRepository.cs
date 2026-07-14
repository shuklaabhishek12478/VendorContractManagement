using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class RoleRepository : IRoleRepository
{
    private readonly AppDbContext _context;

    public RoleRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Role>> GetAllAsync()
    {
        return await _context.Roles.AsNoTracking()

            .Include(x => x.UserRoles)

            .Include(x => x.RolePermissions)

            .OrderBy(x => x.Priority)

            .ToListAsync();
    }

    public async Task<Role?> GetByIdAsync(int id)
    {
        return await _context.Roles.AsNoTracking()

            .Include(x => x.UserRoles)

            .Include(x => x.RolePermissions)

            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Role?> GetByNameAsync(string name)
    {
        return await _context.Roles.AsNoTracking()

            .FirstOrDefaultAsync(x => x.Name == name);
    }

    public async Task<Role> AddAsync(Role role)
    {
        await _context.Roles.AddAsync(role);

        await _context.SaveChangesAsync();

        return role;
    }

    public async Task UpdateAsync(Role role)
    {
        _context.Roles.Update(role);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Role role)
    {
        if (role.IsSystemRole)
            throw new InvalidOperationException(
                "System roles cannot be deleted.");

        _context.Roles.Remove(role);

        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(string name)
    {
        name = name.Trim();

        return await _context.Roles

            .AsNoTracking()

            .AnyAsync(x =>
                x.Name.ToUpper() == name.ToUpper());
    }

    public async Task<bool> ExistsAsync(
    string name,
    int excludeRoleId)
    {
        name = name.Trim().ToUpper();

        return await _context.Roles
            .AnyAsync(x =>
                x.Id != excludeRoleId &&
                x.Name.ToUpper() == name);
    }

    public async Task<List<Role>> SearchAsync(RoleFilterDto filter)
    {
        var query = _context.Roles.AsNoTracking()
            .Include(x => x.UserRoles)
            .Include(x => x.RolePermissions)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var search = filter.Search.Trim().ToUpper();

            query = query.Where(x =>
                x.Name.ToUpper().Contains(search) ||

                (x.Description != null &&
                 x.Description.ToUpper().Contains(search)));
        }

        if (filter.IsActive.HasValue)
        {
            query = query.Where(x =>
                x.IsActive == filter.IsActive.Value);
        }

        if (filter.IsSystemRole.HasValue)
        {
            query = query.Where(x =>
                x.IsSystemRole == filter.IsSystemRole.Value);
        }

        return await query
            .OrderBy(x => x.Priority)
            .ThenBy(x => x.Name)
            .ThenBy(x => x.Id)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();
    }

    public async Task<int> CountUsersAsync(int roleId)
    {
        return await _context.UserRoles
            .CountAsync(x => x.RoleId == roleId);
    }

    public async Task<int> CountPermissionsAsync(int roleId)
    {
        return await _context.RolePermissions
            .CountAsync(x => x.RoleId == roleId);
    }

    public async Task AssignPermissionsAsync(
    int roleId,
    List<int> permissionIds)
    {
        var existingPermissions = await _context.RolePermissions
            .Where(x => x.RoleId == roleId)
            .ToListAsync();

        _context.RolePermissions.RemoveRange(existingPermissions);

        var newPermissions = permissionIds
            .Distinct()
            .Select(permissionId => new RolePermission
            {
                RoleId = roleId,
                PermissionId = permissionId,
                AssignedOn = DateTime.UtcNow,
                AssignedBy = "System"
            })
            .ToList();

        await _context.RolePermissions.AddRangeAsync(newPermissions);

        await _context.SaveChangesAsync();
    }

    public async Task<List<Permission>> GetPermissionsAsync(int roleId)
    {
        return await _context.RolePermissions.AsNoTracking()
            .Where(x => x.RoleId == roleId)
            .Include(x => x.Permission)
            .Select(x => x.Permission)
            .OrderBy(x => x.Module)
            .ThenBy(x => x.Name)
            .ToListAsync();
    }

    public async Task<Role> CloneRoleAsync(
    int roleId,
    string newRoleName)
    {
        var role = await _context.Roles
            .Include(x => x.RolePermissions)
            .FirstOrDefaultAsync(x => x.Id == roleId);

        if (role == null)
            throw new Exception("Role not found.");

        if (await ExistsAsync(newRoleName))
            throw new Exception("Role name already exists.");

        var clonedRole = new Role
        {
            Name = newRoleName.Trim(),
            Description = role.Description,
            Color = role.Color,
            Icon = role.Icon,
            Priority = role.Priority,
            IsActive = true,
            IsSystemRole = false
        };

        await _context.Roles.AddAsync(clonedRole);

        await _context.SaveChangesAsync();

        var permissions = role.RolePermissions
            .Select(x => new RolePermission
            {
                RoleId = clonedRole.Id,
                PermissionId = x.PermissionId,
                AssignedOn = DateTime.UtcNow,
                AssignedBy = "System"
            });

        await _context.RolePermissions.AddRangeAsync(permissions);

        await _context.SaveChangesAsync();

        return clonedRole;
    }

    public async Task AssignUsersAsync(
    int roleId,
    List<int> userIds)
    {
        var existing = await _context.UserRoles
            .Where(x => x.RoleId == roleId)
            .ToListAsync();

        _context.UserRoles.RemoveRange(existing);

        var records = userIds
            .Distinct()
            .Select(userId => new UserRole
            {
                RoleId = roleId,
                UserId = userId,
                AssignedOn = DateTime.UtcNow,
                AssignedBy = "System"
            });

        await _context.UserRoles.AddRangeAsync(records);

        await _context.SaveChangesAsync();
    }

    public async Task<List<User>> GetUsersAsync(
        int roleId)
    {
        return await _context.UserRoles
            .Where(x => x.RoleId == roleId)
            .Include(x => x.User)
            .Select(x => x.User)
            .OrderBy(x => x.FullName)
            .ToListAsync();
    }

    public async Task RemoveUserAsync(
    int roleId,
    int userId)
    {
        var userRole = await _context.UserRoles
            .FirstOrDefaultAsync(x =>
                x.RoleId == roleId &&
                x.UserId == userId);

        if (userRole == null)
            return;

        _context.UserRoles.Remove(userRole);

        await _context.SaveChangesAsync();
    }

    public async Task<RoleStatisticsDto> GetStatisticsAsync()
    {
        var totalRoles = await _context.Roles.CountAsync();

        var activeRoles = await _context.Roles
            .CountAsync(x => x.IsActive);

        var inactiveRoles = await _context.Roles
            .CountAsync(x => !x.IsActive);

        var systemRoles = await _context.Roles
            .CountAsync(x => x.IsSystemRole);

        var customRoles = await _context.Roles
            .CountAsync(x => !x.IsSystemRole);

        return new RoleStatisticsDto
        {
            TotalRoles = totalRoles,
            ActiveRoles = activeRoles,
            InactiveRoles = inactiveRoles,
            SystemRoles = systemRoles,
            CustomRoles = customRoles
        };
    }

    public async Task<List<Role>> GetActiveRolesAsync()
    {
        return await _context.Roles
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Priority)
            .ThenBy(x => x.Name)
            .ToListAsync();
    }
}