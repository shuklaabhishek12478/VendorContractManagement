using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IAnalyticsService
    {
        Task<List<MonthlyTrendDto>> GetContractTrendAsync();

        Task<List<MonthlyTrendDto>> GetVendorTrendAsync();

        Task<ContractStatusDto> GetContractStatusAsync();
    }
}