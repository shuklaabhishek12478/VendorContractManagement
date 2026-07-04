using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IContractService
    {
        Task<IEnumerable<ContractDto>> GetAllAsync();

        Task<ContractDto?> GetByIdAsync(int id);

        Task CreateAsync(CreateContractDto dto);

        Task UpdateAsync(int id, UpdateContractDto dto);

        Task DeleteAsync(int id);

        Task<IEnumerable<ContractDto>> GetExpiringSoonAsync(int days);

        Task<IEnumerable<ContractDto>> GetExpiredAsync();

        Task<IEnumerable<ContractDto>> GetActiveAsync();

        Task SubmitAsync(int id);

        Task ApproveAsync(int id);

        Task RejectAsync(int id, string reason);

        Task<PagedResponse<ContractDto>>GetPagedAsync(ContractQueryParams query);

       // Task RenewAsync(int id);

        Task RenewAsync(int contractId, RenewContractDto dto);

        Task<IEnumerable<ContractDto>>GetRenewalsAsync(int contractId);

        Task TerminateAsync(int id, string reason);

        Task<ContractReportDto> GetReportAsync(ContractReportFilterDto filter);

        Task<byte[]> ExportContractsAsync(ContractReportFilterDto filter);

        Task ApproveRenewalAsync(int id);

        Task ActivateRenewalAsync(int id);

        Task RejectRenewalAsync(int id,string reason);

        Task ActivateAsync(int id);

        Task ExpireContractsAsync();
        Task ArchiveAsync(int id);

        Task SubmitAgainAsync(int id);

        // Task ArchiveAsync(int id);


    }
}