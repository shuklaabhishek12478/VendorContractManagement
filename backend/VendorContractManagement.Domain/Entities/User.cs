using VendorContractManagement.Domain.Common;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiryTime { get; set; }

        public int? VendorId { get; set; }

        public Vendor? Vendor { get; set; }

        public bool IsActive { get; set; } = true;

        // ===== NEW =====

        public ApprovalStatus ApprovalStatus { get; set; }
    = ApprovalStatus.Pending;

        public int? ApprovedBy { get; set; }

        public DateTime? ApprovedOn { get; set; }

        public string? RejectionReason { get; set; }

        public string? PasswordResetToken { get; set; }

        public DateTime? PasswordResetTokenExpiry { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
            = new List<UserRole>();
    }
}