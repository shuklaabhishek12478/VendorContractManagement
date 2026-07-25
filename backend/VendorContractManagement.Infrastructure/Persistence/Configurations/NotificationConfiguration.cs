using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Configurations;

public class NotificationConfiguration
    : IEntityTypeConfiguration<Notification>
{
    public void Configure(
        EntityTypeBuilder<Notification> builder)
    {
        builder.ToTable("Notifications");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Module)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Type)
    .HasConversion<string>()
    .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Message)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.ActionUrl)
            .HasMaxLength(300);

        builder.Property(x => x.IsRead)
            .HasDefaultValue(false);

        builder.Property(x => x.IsDeleted)
            .HasDefaultValue(false);

        builder.Property(x => x.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.UserId);

        builder.HasIndex(x => x.Module);

        builder.HasIndex(x => x.IsRead);

        builder.HasIndex(x => x.CreatedOn);
    }
}