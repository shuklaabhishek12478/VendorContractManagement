namespace VendorContractManagement.Application.DTOs
{
    public class VendorDocumentDto
    {
        public int Id { get; set; }

        public int VendorId { get; set; }

        public string FileName { get; set; } = string.Empty;

        public string OriginalFileName { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public string DocumentType { get; set; } = string.Empty;

        public DateTime UploadedOn { get; set; }
    }
}