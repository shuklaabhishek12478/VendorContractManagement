using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IDocumentService
    {
        Task<IEnumerable<DocumentDto>> GetByContractIdAsync(int contractId);

        Task<DocumentDto?> GetByIdAsync(int id);

        Task<string> UploadAsync(DocumentUploadDto dto);

        Task<bool> DeleteAsync(int id);

        

        Task<(byte[] file, string contentType, string fileName)?> DownloadAsync(int id);
    }
}