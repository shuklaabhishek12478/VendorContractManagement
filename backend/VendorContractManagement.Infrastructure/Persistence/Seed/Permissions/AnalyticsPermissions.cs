using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class AnalyticsPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new Permission
            {
                Name = "View Contract Analytics",
                Code = "Analytics.ContractTrend",
                Module = "Analytics",
                Description = "View contract trend analytics"
            },

            new Permission
            {
                Name = "View Vendor Analytics",
                Code = "Analytics.VendorTrend",
                Module = "Analytics",
                Description = "View vendor trend analytics"
            },

            new Permission
            {
                Name = "View Contract Status Analytics",
                Code = "Analytics.ContractStatus",
                Module = "Analytics",
                Description = "View contract status analytics"
            }
        };
    }
}