
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IVendorService
    {
        Task<IEnumerable<VendorDto>> GetAllAsync();

        Task<VendorDto?> GetByIdAsync(int id);

       // Task CreateAsync(CreateVendorDto dto);

        Task<int> CreateAsync(CreateVendorDto dto);

        Task UpdateAsync(int id, UpdateVendorDto dto);

        Task DeleteAsync(int id);

        Task ActivateAsync(int id);
        Task DeactivateAsync(int id);

        Task<PagedResponse<VendorDto>>GetPagedAsync(VendorQueryParams query);
        Task<IEnumerable<ContractDto>>GetContractsAsync(int vendorId);

        Task<IEnumerable<DocumentDto>> GetDocumentsAsync(int vendorId);
    }
}