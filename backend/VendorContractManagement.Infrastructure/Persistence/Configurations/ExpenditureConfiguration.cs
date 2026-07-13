using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Configurations;

public class ExpenditureConfiguration : IEntityTypeConfiguration<Expenditure>
{
    public void Configure(EntityTypeBuilder<Expenditure> builder)
    {
        builder.ToTable("Expenditures");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ExpenseNumber)
            .IsRequired()
            .HasMaxLength(30);

        builder.HasIndex(x => x.ExpenseNumber)
            .IsUnique();

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.InvoiceNumber)
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.Amount)
            .HasPrecision(18, 2);

        builder.Property(x => x.TaxPercentage)
            .HasPrecision(5, 2);

        builder.Property(x => x.TaxAmount)
            .HasPrecision(18, 2);

        builder.Property(x => x.TotalAmount)
            .HasPrecision(18, 2);

        builder.Property(x => x.IsActive)
            .HasDefaultValue(true);

        builder.Property(x => x.IsDeleted)
            .HasDefaultValue(false);

        builder.Property(x => x.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        builder.HasOne(x => x.Vendor)
            .WithMany()
            .HasForeignKey(x => x.VendorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Contract)
            .WithMany()
            .HasForeignKey(x => x.ContractId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.VendorId);

        builder.HasIndex(x => x.ContractId);

        builder.HasIndex(x => x.Department);

        builder.HasIndex(x => x.Category);

        builder.HasIndex(x => x.Status);

        builder.HasIndex(x => x.PaymentStatus);

        builder.HasIndex(x => x.ExpenseDate);

        builder.HasIndex(x => x.CreatedOn);
    }
}