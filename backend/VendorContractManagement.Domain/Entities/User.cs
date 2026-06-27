using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = "Viewer";

        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiryTime { get; set; }

        public int? VendorId { get; set; }

        public Vendor? Vendor { get; set; }

        public bool IsActive { get; set; } = true;
    }
}