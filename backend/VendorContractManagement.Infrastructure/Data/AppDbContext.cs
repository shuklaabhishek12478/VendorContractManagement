using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data.Configurations;

namespace VendorContractManagement.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Vendor> Vendors { get; set; }

        public DbSet<Contract> Contracts { get; set; }

        public DbSet<Document> Documents { get; set; }

        public DbSet<VendorDocument> VendorDocuments { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<AuditLog> AuditLogs { get; set; }

        public DbSet<RecentActivity> RecentActivities { get; set; }

        public DbSet<Expenditure> Expenditures { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<RolePermission> RolePermissions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
       typeof(AppDbContext).Assembly);
            modelBuilder.Entity<Vendor>()
                .HasMany(v => v.Contracts)
                .WithOne(c => c.Vendor)
                .HasForeignKey(c => c.VendorId);

            modelBuilder.Entity<Contract>()
                .HasMany(c => c.Documents)
                .WithOne(d => d.Contract)
                .HasForeignKey(d => d.ContractId);

            modelBuilder.Entity<Contract>()
                .HasIndex(c => c.ContractNumber)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasOne(x => x.Vendor)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.VendorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contract>()
                .HasOne(c => c.ParentContract)
                .WithMany(c => c.Renewals)
                .HasForeignKey(c => c.ParentContractId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Expenditure>()
                .HasIndex(x => x.InvoiceNumber)
                .IsUnique();

            modelBuilder.Entity<UserRole>()
                .HasKey(x => new{x.UserId, x.RoleId
                });

            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            //prole permission 

            modelBuilder.Entity<RolePermission>()
    .HasKey(x => new
    {
        x.RoleId,
        x.PermissionId
    });

            modelBuilder.Entity<RolePermission>()
                .HasOne(x => x.Role)
                .WithMany(x => x.RolePermissions)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RolePermission>()
                .HasOne(x => x.Permission)
                .WithMany(x => x.RolePermissions)
                .HasForeignKey(x => x.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Role>()
    .HasIndex(x => x.Name)
    .IsUnique();

            modelBuilder.Entity<Permission>()
                .HasIndex(x => x.Code)
                .IsUnique();
        }
    }
}