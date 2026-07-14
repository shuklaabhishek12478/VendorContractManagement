using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class PermissionRepository : IPermissionRepository
{
    private readonly AppDbContext _context;

    public PermissionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> UserHasPermissionAsync(
        int userId,
        string permissionCode)
    {
        return await _context.UserRoles
            .Where(x => x.UserId == userId)
            .SelectMany(x => x.Role.RolePermissions)
            .AnyAsync(x => x.Permission.Code == permissionCode);
    }

    public async Task<List<Permission>> GetAllAsync()
    {
        return await _context.Permissions
            .OrderBy(x => x.Module)
            .ThenBy(x => x.Name)
            .ToListAsync();
    }

    public async Task<Permission?> GetByIdAsync(int id)
    {
        return await _context.Permissions
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}