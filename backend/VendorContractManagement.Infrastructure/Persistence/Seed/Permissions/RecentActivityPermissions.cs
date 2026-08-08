using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class RecentActivityPermissions
{
    public static List<Permission> Get()
    {
        return new List<Permission>
        {
            new Permission
            {
                Name = "RecentActivity.View",
                Module = "RecentActivity",
                Description = "View recent activities"
            }
        };
    }
}