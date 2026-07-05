using Microsoft.AspNetCore.Http;

namespace VendorContractManagement.Application.DTOs
{
    public class DocumentUploadRequest
    {
        public int ContractId { get; set; }

        public IFormFile File { get; set; } = null!;
    }
}