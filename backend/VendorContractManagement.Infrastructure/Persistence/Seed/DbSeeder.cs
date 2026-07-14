using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Persistence.Seed;

public static class DbSeeder
{
    public static async Task SeedAdminAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        // Admin role should already exist
        var adminRole = await context.Roles
            .FirstAsync(x => x.Name == "Admin");

        // Check Admin user
        var adminUser = await context.Users
            .FirstOrDefaultAsync(x => x.Email == "admin@gmail.com");

        if (adminUser != null)
            return;

        adminUser = new User
        {
            FullName = "System Administrator",
            Email = "admin@gmail.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("AdminA@12345"),
            IsActive = true,
            CreatedOn = DateTime.UtcNow,
            UpdatedOn = DateTime.UtcNow
        };

        context.Users.Add(adminUser);

        await context.SaveChangesAsync();

        context.UserRoles.Add(new UserRole
        {
            UserId = adminUser.Id,
            RoleId = adminRole.Id,
            AssignedOn = DateTime.UtcNow,
            AssignedBy = "System"
        });

        await context.SaveChangesAsync();
    }
}