using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class PermissionDependencySeeder
{
    public static List<PermissionDependency> Get(
        List<Permission> permissions)
    {
        var permissionLookup = permissions.ToDictionary(
            x => x.Code,
            x => x.Id);

        return new List<PermissionDependency>
        {
            // Vendor
            Create(permissionLookup, "Vendor.Create", "Vendor.View"),
            Create(permissionLookup, "Vendor.Edit", "Vendor.View"),
            Create(permissionLookup, "Vendor.Delete", "Vendor.View"),
            Create(permissionLookup, "Vendor.Delete", "Vendor.Edit"),

            // Contract
            Create(permissionLookup, "Contract.Create", "Contract.View"),
            Create(permissionLookup, "Contract.Edit", "Contract.View"),
            Create(permissionLookup, "Contract.Delete", "Contract.View"),
            Create(permissionLookup, "Contract.Delete", "Contract.Edit"),
            Create(permissionLookup, "Contract.Approve", "Contract.View"),

            // User
            Create(permissionLookup, "User.Create", "User.View"),
            Create(permissionLookup, "User.Edit", "User.View"),
            Create(permissionLookup, "User.Delete", "User.View"),
            Create(permissionLookup, "User.Delete", "User.Edit"),

            // Role
            Create(permissionLookup, "Role.Create", "Role.View"),
            Create(permissionLookup, "Role.Edit", "Role.View"),
            Create(permissionLookup, "Role.Delete", "Role.View"),
            Create(permissionLookup, "Role.Delete", "Role.Edit")
        };
    }

    private static PermissionDependency Create(
        Dictionary<string, int> lookup,
        string permission,
        string dependsOn)
    {
        return new PermissionDependency
        {
            PermissionId = lookup[permission],
            DependsOnPermissionId = lookup[dependsOn]
        };
    }
}