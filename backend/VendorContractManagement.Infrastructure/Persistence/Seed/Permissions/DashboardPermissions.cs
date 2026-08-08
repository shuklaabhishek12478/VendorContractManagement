using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class DashboardPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new Permission
            {
                Name = "View Dashboard",
                Code = "Dashboard.View",
                Module = "Dashboard",
                Description = "View main dashboard"
            },

            new Permission
            {
                Name = "View Vendor Dashboard",
                Code = "Dashboard.Vendor",
                Module = "Dashboard",
                Description = "View vendor dashboard"
            },

            new Permission
            {
                Name = "View Dashboard Analytics",
                Code = "Dashboard.Analytics",
                Module = "Dashboard",
                Description = "View dashboard analytics"
            },

            new Permission
            {
                Name = "View Top Vendors",
                Code = "Dashboard.TopVendors",
                Module = "Dashboard",
                Description = "View top vendors analytics"
            },

            new Permission
            {
                Name = "View Status Distribution",
                Code = "Dashboard.StatusDistribution",
                Module = "Dashboard",
                Description = "View contract status distribution"
            },

            new Permission
            {
                Name = "View Monthly Contract Trend",
                Code = "Dashboard.MonthlyTrend",
                Module = "Dashboard",
                Description = "View monthly contract trend"
            },

            new Permission
            {
                Name = "View Contract Value Trend",
                Code = "Dashboard.ContractValueTrend",
                Module = "Dashboard",
                Description = "View contract value trend"
            },

            new Permission
            {
                Name = "View Expiry Analytics",
                Code = "Dashboard.ExpiryAnalytics",
                Module = "Dashboard",
                Description = "View contract expiry analytics"
            },

            new Permission
            {
                Name = "View Dashboard Charts",
                Code = "Dashboard.Charts",
                Module = "Dashboard",
                Description = "View dashboard charts"
            },

            new Permission
            {
                Name = "View Dashboard Notifications",
                Code = "Dashboard.Notifications",
                Module = "Dashboard",
                Description = "View dashboard notifications"
            },

            new Permission
            {
                Name = "View Recent Activities",
                Code = "Dashboard.RecentActivities",
                Module = "Dashboard",
                Description = "View recent activities"
            }
        };
    }
}