using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repositories
{
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
                .ToListAsync();

            return rules
                .GroupBy(x => x.PermissionCode)
                .Select(g => new PermissionRuleDto
                {
                    Permission = g.Key,

                    Requires = g
                        .Select(x => x.DependsOnPermissionCode)
                        .Distinct()
                        .OrderBy(x => x)
                        .ToList()
                })
                .OrderBy(x => x.Permission)
                .ToList();
        }
    }
}