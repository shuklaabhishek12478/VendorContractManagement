using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IVendorDocumentService
    {
        Task<List<VendorDocumentDto>> GetByVendorIdAsync(int vendorId);

        Task<VendorDocumentDto?> GetByIdAsync(int id);

        Task<int> UploadAsync(VendorDocumentUploadRequest request);

        Task<byte[]> DownloadAsync(int id);

        Task DeleteAsync(int id);
    }
}