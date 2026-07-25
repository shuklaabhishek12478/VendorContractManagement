using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class RolePermissionSeeder
{
    public static List<RolePermission> GetRolePermissions(
        List<Role> roles,
        List<Permission> permissions)
    {
        var result = new List<RolePermission>();

        foreach (var role in roles)
        {
            IEnumerable<Permission> rolePermissions =
                Enumerable.Empty<Permission>();

            switch (role.Name)
            {
                case "Super Admin":

                    rolePermissions = permissions;

                    break;

                case "Admin":

                    rolePermissions = permissions.Where(x =>
                        x.Module != "Settings");

                    break;

                case "Viewer":

                    rolePermissions = permissions.Where(x =>
                        x.Code.EndsWith(".View") ||
                        x.Code.EndsWith(".ViewDetails"));

                    break;

                default:

                    rolePermissions = Enumerable.Empty<Permission>();

                    break;
            }

            foreach (var permission in rolePermissions)
            {
                result.Add(new RolePermission
                {
                    RoleId = role.Id,
                    PermissionId = permission.Id,
                    AssignedOn = DateTime.UtcNow,
                    AssignedBy = "System"
                });
            }
        }

        return result;
    }
}