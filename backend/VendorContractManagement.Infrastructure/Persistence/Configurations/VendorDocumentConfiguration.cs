using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Configurations
{
    public class VendorDocumentConfiguration
        : IEntityTypeConfiguration<VendorDocument>
    {
        public void Configure(
            EntityTypeBuilder<VendorDocument> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.FileName)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.OriginalFileName)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.ContentType)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.DocumentType)
                .HasMaxLength(100);

            builder.Property(x => x.FileContent)
                .IsRequired();

            builder.HasOne(x => x.Vendor)
                .WithMany(v => v.VendorDocuments)
                .HasForeignKey(x => x.VendorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}