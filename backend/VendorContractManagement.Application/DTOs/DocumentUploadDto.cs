namespace VendorContractManagement.Application.DTOs
{
    public class DocumentUploadDto
    {
        public int ContractId { get; set; }

        public string FileName { get; set; } = string.Empty;

        public byte[] FileContent { get; set; } = Array.Empty<byte>();

        public string ContentType { get; set; } = string.Empty;
    }
}