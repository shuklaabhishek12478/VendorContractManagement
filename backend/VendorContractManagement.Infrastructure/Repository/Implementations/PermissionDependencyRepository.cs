using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class PermissionDependencyRepository
    : IPermissionDependencyRepository
{
    private readonly AppDbContext _context;

    public PermissionDependencyRepository(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PermissionRuleDto>> GetPermissionRulesAsync()
    {
        var rules = await _context.PermissionDependencies
            .AsNoTracking()
            .Include(x => x.Permission)
            .Include(x => x.DependsOnPermission)
            .ToListAsync();

        foreach (var item in rules)
        {
            if (item.Permission == null)
                throw new Exception($"Permission navigation is NULL. PermissionId = {item.PermissionId}");

            if (item.DependsOnPermission == null)
                throw new Exception($"DependsOnPermission navigation is NULL. DependsOnPermissionId = {item.DependsOnPermissionId}");
        }

        return rules
            .GroupBy(x => x.Permission.Code)
            .Select(g => new PermissionRuleDto
            {
                Permission = g.Key,
                Requires = g
                    .Select(x => x.DependsOnPermission.Code)
                    .Distinct()
                    .OrderBy(x => x)
                    .ToList()
            })
            .OrderBy(x => x.Permission)
            .ToList();
    }
}