using Microsoft.AspNetCore.Http;

namespace VendorContractManagement.Application.DTOs
{
    public class VendorDocumentUploadRequest
    {
        public int VendorId { get; set; }

        public string DocumentType { get; set; } = string.Empty;

        public IFormFile File { get; set; } = null!;
    }
}