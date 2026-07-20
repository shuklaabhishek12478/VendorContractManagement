using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Persistence.Configurations;

public class PermissionDependencyConfiguration
    : IEntityTypeConfiguration<PermissionDependency>
{
    public void Configure(EntityTypeBuilder<PermissionDependency> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.Permission)
            .WithMany()
            .HasForeignKey(x => x.PermissionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(x => x.DependsOnPermission)
            .WithMany()
            .HasForeignKey(x => x.DependsOnPermissionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasIndex(x => new
            {
                x.PermissionId,
                x.DependsOnPermissionId
            })
            .IsUnique();
    }
}