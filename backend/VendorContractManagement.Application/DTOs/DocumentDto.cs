namespace VendorContractManagement.Application.DTOs
{
    public class DocumentDto
    {
        public int Id { get; set; }

        public string FileName { get; set; } = string.Empty;

        public string OriginalFileName { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public string ContentType { get; set; } = string.Empty;

        public int ContractId { get; set; }

        public string DownloadUrl { get; set; } = string.Empty;
    }
}