using Microsoft.EntityFrameworkCore;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        // ==========================================
        // Seed Roles
        // ==========================================

        var roles = RoleSeeder.GetRoles();

        foreach (var role in roles)
        {
            var existingRole = await context.Roles
                .FirstOrDefaultAsync(x => x.Name == role.Name);

            if (existingRole == null)
            {
                context.Roles.Add(role);
            }
            else
            {
                existingRole.Description = role.Description;
            }
        }

        await context.SaveChangesAsync();

        // ==========================================
        // Seed Permissions
        // ==========================================

        var permissions = PermissionSeeder.GetPermissions();

        foreach (var permission in permissions)
        {
            var existingPermission = await context.Permissions
                .FirstOrDefaultAsync(x => x.Code == permission.Code);

            if (existingPermission == null)
            {
                context.Permissions.Add(permission);
            }
            else
            {
                existingPermission.Name = permission.Name;
                existingPermission.Module = permission.Module;
                existingPermission.Description = permission.Description;
            }
        }

        await context.SaveChangesAsync();

        // ==========================================
        // Seed Permission Dependencies
        // ==========================================

        var permissionList =
            await context.Permissions.ToListAsync();

        var dependencies =
            PermissionDependencySeeder.Get(permissionList);

        foreach (var dependency in dependencies)
        {
            var exists =
                await context.PermissionDependencies.AnyAsync(x =>

                    x.PermissionId ==
                    dependency.PermissionId

                    &&

                    x.DependsOnPermissionId ==
                    dependency.DependsOnPermissionId);

            if (!exists)
            {
                context.PermissionDependencies.Add(dependency);
            }
        }

        await context.SaveChangesAsync();

        // ==========================================
        // Seed Role Permissions
        // ==========================================

        var dbRoles =
            await context.Roles.ToListAsync();

        var dbPermissions =
            await context.Permissions.ToListAsync();

        var mappings =
            RolePermissionSeeder.GetRolePermissions(
                dbRoles,
                dbPermissions);

        foreach (var mapping in mappings)
        {
            var exists =
                await context.RolePermissions.AnyAsync(x =>

                    x.RoleId == mapping.RoleId

                    &&

                    x.PermissionId == mapping.PermissionId);

            if (!exists)
            {
                context.RolePermissions.Add(mapping);
            }
        }

        await context.SaveChangesAsync();
    }
}