using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations
{
    public class RecentActivityRepository
        : IRecentActivityRepository
    {
        private readonly AppDbContext _context;

        public RecentActivityRepository(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(
            RecentActivity activity)
        {
            await _context.RecentActivities
                .AddAsync(activity);
        }

        public async Task<IEnumerable<RecentActivity>>
            GetRecentAsync(int count = 20)
        {
            return await _context.RecentActivities
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();
        }
    }
}