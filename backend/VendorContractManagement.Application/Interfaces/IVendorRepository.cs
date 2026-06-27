using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IVendorRepository
    {
        Task<IEnumerable<Vendor>> GetAllAsync();
        Task<Vendor?> GetByIdAsync(int id);
        Task AddAsync(Vendor vendor);
        void Update(Vendor vendor);
        void Delete(Vendor vendor);
        Task<Vendor?> GetVendorWithContractsAsync(int id);

        Task<Vendor?> GetByEmailAsync(string email);
        Task<Vendor?> GetByGSTAsync(string gstNumber);
        Task<Vendor?> GetByPANAsync(string panNumber);

        Task<(IEnumerable<Vendor> Vendors, int TotalCount)>GetPagedAsync(VendorQueryParams query);
    }
}