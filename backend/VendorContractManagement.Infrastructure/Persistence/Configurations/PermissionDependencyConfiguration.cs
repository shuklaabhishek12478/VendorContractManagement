using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Persistence.Configurations;

public class PermissionDependencyConfiguration
    : IEntityTypeConfiguration<PermissionDependency>
{
    public void Configure(EntityTypeBuilder<PermissionDependency> builder)
    {
        builder.Property(x => x.PermissionCode)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(x => x.DependsOnPermissionCode)
            .HasMaxLength(150)
            .IsRequired();

        builder.HasIndex(x =>
            new
            {
                x.PermissionCode,
                x.DependsOnPermissionCode
            })
            .IsUnique();
    }
}