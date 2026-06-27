using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Persistence.Configurations;

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.ToTable("Documents");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.FileName)
               .HasMaxLength(250)
               .IsRequired();

        builder.HasOne(x => x.Contract)
               .WithMany()
               .HasForeignKey(x => x.ContractId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}