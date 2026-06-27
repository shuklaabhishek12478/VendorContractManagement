using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IContractRepository
    {
        Task<IEnumerable<Contract>> GetAllAsync();

        Task<Contract?> GetByIdAsync(int id);

        Task AddAsync(Contract contract);

        void Update(Contract contract);

        void Delete(Contract contract);

        Task<IEnumerable<Contract>> GetExpiringSoonAsync(int days);
        Task<IEnumerable<Contract>> GetExpiredAsync();
        Task<IEnumerable<Contract>> GetActiveAsync();

        Task<IEnumerable<Contract>>GetByVendorIdAsync(int vendorId);

        Task<IEnumerable<Contract>> GetPendingApprovalAsync();

        Task<IEnumerable<Contract>> GetActiveContractsAsync();

        Task<(IEnumerable<Contract> Contracts, int TotalCount)>GetPagedAsync(ContractQueryParams query);

        Task<IEnumerable<Contract>>GetRenewalsAsync(int parentContractId);

        Task<IEnumerable<Contract>> GetReportDataAsync(ContractReportFilterDto filter);

        Task<IEnumerable<TopVendorDto>> GetTopVendorsAsync(int count);

        Task<IEnumerable<ContractStatusAnalyticsDto>>GetStatusDistributionAsync();

        Task<IEnumerable<MonthlyContractTrendDto>>GetMonthlyContractTrendAsync();

        Task<IEnumerable<ContractValueTrendDto>>GetContractValueTrendAsync();

        Task<ExpiryAnalyticsDto>GetExpiryAnalyticsAsync();
        Task<string> GenerateContractNumberAsync();
        Task<int> GetContractCountAsync();
    }
}