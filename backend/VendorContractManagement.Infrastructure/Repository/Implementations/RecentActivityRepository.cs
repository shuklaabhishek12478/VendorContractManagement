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

        public async Task<List<RecentActivity>> GetByVendorIdAsync(
    int vendorId,
    int count)
        {
            return await _context.RecentActivities
                .Where(x => x.Module == "Vendor")
                .Where(x => x.EntityId == vendorId)
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();
        }

        public async Task<List<RecentActivity>> GetByContractIdAsync(
    int contractId,
    int count)
        {
            return await _context.RecentActivities
                .Where(x => x.Module == "Contract")
                .Where(x => x.EntityId == contractId)
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();
        }
    }
}