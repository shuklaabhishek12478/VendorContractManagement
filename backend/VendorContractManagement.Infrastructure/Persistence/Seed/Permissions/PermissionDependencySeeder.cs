using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class PermissionDependencySeeder
{
    public static List<PermissionDependency> Get(
        List<Permission> permissions)
    {
        var result = new List<PermissionDependency>();

        foreach (var permission in permissions)
        {
            var parts = permission.Code.Split('.');

            if (parts.Length != 2)
                continue;

            var module = parts[0];
            var action = parts[1];

            // View permission has no dependency
            if (action == "View")
                continue;

            var viewPermission = permissions.FirstOrDefault(x =>
                x.Code == $"{module}.View");

            if (viewPermission == null)
                continue;

            result.Add(new PermissionDependency
            {
                PermissionId = permission.Id,
                DependsOnPermissionId = viewPermission.Id
            });

            // Delete depends on Edit (if Edit exists)
            if (action == "Delete")
            {
                var editPermission = permissions.FirstOrDefault(x =>
                    x.Code == $"{module}.Edit");

                if (editPermission != null)
                {
                    result.Add(new PermissionDependency
                    {
                        PermissionId = permission.Id,
                        DependsOnPermissionId = editPermission.Id
                    });
                }
            }
        }

        return result;
    }
}