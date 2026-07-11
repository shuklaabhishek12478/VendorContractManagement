using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities
{
    public class VendorDocument : BaseEntity
    {
        public int VendorId { get; set; }

        public Vendor Vendor { get; set; } = null!;

        public string FileName { get; set; } = string.Empty;

        public string OriginalFileName { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public byte[] FileContent { get; set; } = Array.Empty<byte>();

        public string DocumentType { get; set; } = string.Empty;

        public DateTime UploadedOn { get; set; } = DateTime.UtcNow;

    }
}