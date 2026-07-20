using Microsoft.EntityFrameworkCore;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        // ==========================
        // Seed Roles
        // ==========================
        if (!await context.Roles.AnyAsync())
        {
            var roles = RoleSeeder.GetRoles();

            context.Roles.AddRange(roles);

            await context.SaveChangesAsync();
        }

        // ==========================
        // Seed Permissions
        // ==========================
        if (!await context.Permissions.AnyAsync())
        {
            var permissions = PermissionSeeder.GetPermissions();

            foreach (var permission in permissions)
            {
                var exists = await context.Permissions
                    .AnyAsync(x => x.Code == permission.Code);

                if (!exists)
                {
                    context.Permissions.Add(permission);
                }
            }

            await context.SaveChangesAsync();
        }

        // ==========================
        // Seed Permission Dependencies
        // ==========================
        if (!await context.PermissionDependencies.AnyAsync())
        {
            var permissions = await context.Permissions.ToListAsync();

            var dependencies =
                PermissionDependencySeeder.Get(permissions);

            foreach (var dependency in dependencies)
            {
                var exists =
                    await context.PermissionDependencies.AnyAsync(x =>

                        x.PermissionId ==
                        dependency.PermissionId

                        &&

                        x.DependsOnPermissionId ==
                        dependency.DependsOnPermissionId
                    );

                if (!exists)
                {
                    context.PermissionDependencies.Add(dependency);
                }
            }

            await context.SaveChangesAsync();
        }

        // ==========================
        // Seed Role Permissions
        // ==========================
        if (!await context.RolePermissions.AnyAsync())
        {
            var roles = await context.Roles.ToListAsync();

            var permissions = await context.Permissions.ToListAsync();

            var mappings =
                RolePermissionSeeder.GetRolePermissions(
                    roles,
                    permissions);

            context.RolePermissions.AddRange(mappings);

            await context.SaveChangesAsync();
        }
    }
}