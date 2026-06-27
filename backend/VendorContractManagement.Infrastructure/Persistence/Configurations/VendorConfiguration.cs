using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Persistence.Configurations;

public class VendorConfiguration : IEntityTypeConfiguration<Vendor>
{
    public void Configure(EntityTypeBuilder<Vendor> builder)
    {
        builder.ToTable("Vendors");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.VendorName)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(x => x.CompanyName)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(x => x.Email)
               .HasMaxLength(200);

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}