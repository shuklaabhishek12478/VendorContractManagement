using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Persistence.Seed;

public static class DbSeeder
{
    public static async Task SeedAdminAsync(
    AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Users.AnyAsync(x => x.Role == "Admin"))
        {
            return;
        }

        var admin = new User
        {
            FullName = "System Administrator",
            Email = "admin@gmail.com",
            Role = "Admin",
            IsActive = true
        };

        
        admin.PasswordHash =
        BCrypt.Net.BCrypt.HashPassword("AdminA@12345");

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }
}