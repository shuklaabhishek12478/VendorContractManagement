using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class RolePermissionSeeder
{
    public static List<RolePermission> GetRolePermissions(
        List<Role> roles,
        List<Permission> permissions)
    {
        var result = new List<RolePermission>();

        var superAdmin =
            roles.First(x => x.Name == "Super Admin");

        var admin =
            roles.First(x => x.Name == "Admin");

        var viewer =
            roles.First(x => x.Name == "Viewer");

        // ==========================
        // Super Admin
        // ==========================

        foreach (var permission in permissions)
        {
            result.Add(new RolePermission
            {
                RoleId = superAdmin.Id,
                PermissionId = permission.Id,
                AssignedOn = DateTime.UtcNow,
                AssignedBy = "System"
            });
        }

        // ==========================
        // Admin
        // ==========================

        foreach (var permission in permissions)
        {
            if (permission.Module != "Settings")
            {
                result.Add(new RolePermission
                {
                    RoleId = admin.Id,
                    PermissionId = permission.Id,
                    AssignedOn = DateTime.UtcNow,
                    AssignedBy = "System"
                });
            }
        }

        // ==========================
        // Viewer
        // ==========================

        foreach (var permission in permissions)
        {
            if (permission.Code.EndsWith(".View") ||
                permission.Code.EndsWith(".ViewDetails"))
            {
                result.Add(new RolePermission
                {
                    RoleId = viewer.Id,
                    PermissionId = permission.Id,
                    AssignedOn = DateTime.UtcNow,
                    AssignedBy = "System"
                });
            }
        }

        return result;
    }
}