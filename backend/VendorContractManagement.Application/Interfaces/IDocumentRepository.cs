using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetByContractIdAsync(int contractId);

        Task<Document?> GetByIdAsync(int id);

        Task AddAsync(Document document);

        void Delete(Document document);

        Task<int> GetCountAsync();

        Task<int> CountByVendorIdAsync(int vendorId);

        Task<Document?> GetByIdWithContractAsync(int id);
    }
}