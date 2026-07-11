namespace VendorContractManagement.Application.DTOs
{
    public class VendorDocumentUploadDto
    {
        public int VendorId { get; set; }

        public string FileName { get; set; } = string.Empty;

        public byte[] FileContent { get; set; } = Array.Empty<byte>();

        public string ContentType { get; set; } = string.Empty;

        public string DocumentType { get; set; } = string.Empty;
    }
}