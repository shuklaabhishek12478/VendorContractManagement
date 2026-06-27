using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Persistence.Configurations;

public class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
    public void Configure(EntityTypeBuilder<Contract> builder)
    {
        builder.Property(x => x.ContractNumber)
               .HasMaxLength(50)
               .IsRequired();

        builder.Property(x => x.ContractValue)
               .HasPrecision(18, 2);

        builder.HasOne(x => x.Vendor)
               .WithMany(x => x.Contracts)
               .HasForeignKey(x => x.VendorId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}