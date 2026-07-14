using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data.Seed.Permissions;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class PermissionSeeder
{
    public static List<Permission> GetPermissions()
    {
        var permissions = new List<Permission>();

        permissions.AddRange(VendorPermissions.Get());
        permissions.AddRange(ContractPermissions.Get());
        permissions.AddRange(UserPermissions.Get());
        return permissions;
    }
}