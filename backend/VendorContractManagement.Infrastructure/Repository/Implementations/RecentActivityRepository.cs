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
            var activities = await _context.RecentActivities
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();
            await PopulatePerformedByNamesAsync(activities);

            return activities;
        }

        public async Task<List<RecentActivity>> GetByVendorIdAsync(
    int vendorId,
    int count)
        {
            var activities = await _context.RecentActivities
                .Where(x => x.Module == "Vendor")
                .Where(x => x.EntityId == vendorId)
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();

            await PopulatePerformedByNamesAsync(activities);
            return activities;
        }

        public async Task<List<RecentActivity>> GetByContractIdAsync(
    int contractId,
    int count)
        {
            var activities = await _context.RecentActivities
                .Where(x => x.Module == "Contract")
                .Where(x => x.EntityId == contractId)
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();

            await PopulatePerformedByNamesAsync(activities);

            return activities;
        }


        public async Task<List<RecentActivity>> GetByUserIdAsync(
    int userId,
    int count)
        {
            var activities = await _context.RecentActivities
                .Where(x => x.Module == "User")
                .Where(x => x.EntityId == userId)
                .OrderByDescending(x => x.CreatedOn)
                .Take(count)
                .ToListAsync();

            await PopulatePerformedByNamesAsync(activities);

            return activities;
        }

        private async Task PopulatePerformedByNamesAsync(
    List<RecentActivity> activities)
        {
            var userIds = activities
                .Where(x => !string.IsNullOrWhiteSpace(x.PerformedBy))
                .Select(x =>
                {
                    return int.TryParse(
                        x.PerformedBy,
                        out var userId)
                        ? userId
                        : (int?)null;
                })
                .Where(x => x.HasValue)
                .Select(x => x!.Value)
                .Distinct()
                .ToList();

            if (userIds.Count == 0)
            {
                return;
            }

            var users = await _context.Users
                .Where(x => userIds.Contains(x.Id))
                .Select(x => new
                {
                    x.Id,
                    x.FullName
                })
                .ToListAsync();

            var userDictionary = users
                .ToDictionary(
                    x => x.Id,
                    x => x.FullName);

            foreach (var activity in activities)
            {
                if (!int.TryParse(
                    activity.PerformedBy,
                    out var userId))
                {
                    continue;
                }

                if (userDictionary.TryGetValue(
                    userId,
                    out var fullName))
                {
                    activity.PerformedBy = fullName;
                }
            }
        }
    }
}