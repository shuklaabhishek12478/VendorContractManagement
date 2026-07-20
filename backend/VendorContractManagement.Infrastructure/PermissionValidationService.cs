using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Services;

public class PermissionValidationService
    : IPermissionValidationService
{
    private readonly AppDbContext _context;

    public PermissionValidationService(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<PermissionValidationResultDto> ValidateAsync(
        List<int> permissionIds)
    {
        var result = new PermissionValidationResultDto
        {
            IsValid = true
        };

        var dependencies = await _context.PermissionDependencies
     .AsNoTracking()
     .ToListAsync();

        foreach (var dependency in dependencies)
        {
            if (!permissionIds.Contains(dependency.PermissionId))
                continue;

            if (!permissionIds.Contains(dependency.DependsOnPermissionId))
            {
                result.IsValid = false;

                var permission =
                    await _context.Permissions
                        .AsNoTracking()
                        .FirstAsync(x => x.Id == dependency.PermissionId);

                var requiredPermission =
                    await _context.Permissions
                        .AsNoTracking()
                        .FirstAsync(x => x.Id == dependency.DependsOnPermissionId);

                result.Errors.Add(
                    $"{permission.Code} requires {requiredPermission.Code}");
            }
        }

        return result;

      
    }
}