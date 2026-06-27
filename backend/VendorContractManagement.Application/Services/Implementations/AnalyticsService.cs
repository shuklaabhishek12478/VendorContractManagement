using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IVendorRepository _vendorRepository;

        public AnalyticsService(
            IContractRepository contractRepository,
            IVendorRepository vendorRepository)
        {
            _contractRepository = contractRepository;
            _vendorRepository = vendorRepository;
        }

        public async Task<List<MonthlyTrendDto>> GetContractTrendAsync()
        {
            var contracts = await _contractRepository.GetAllAsync();

            return contracts
                .GroupBy(x => new
                {
                    x.CreatedOn.Year,
                    x.CreatedOn.Month
                })
                .OrderBy(x => x.Key.Year)
                .ThenBy(x => x.Key.Month)
                .Select(x => new MonthlyTrendDto
                {
                    Month = $"{x.Key.Month}/{x.Key.Year}",
                    Count = x.Count()
                })
                .ToList();
        }

        public async Task<List<MonthlyTrendDto>> GetVendorTrendAsync()
        {
            var vendors = await _vendorRepository.GetAllAsync();

            return vendors
                .GroupBy(x => new
                {
                    x.CreatedOn.Year,
                    x.CreatedOn.Month
                })
                .OrderBy(x => x.Key.Year)
                .ThenBy(x => x.Key.Month)
                .Select(x => new MonthlyTrendDto
                {
                    Month = $"{x.Key.Month}/{x.Key.Year}",
                    Count = x.Count()
                })
                .ToList();
        }

        public async Task<ContractStatusDto> GetContractStatusAsync()
        {
            var contracts = await _contractRepository.GetAllAsync();

            return new ContractStatusDto
            {
                Active = contracts.Count(x => x.Status == ContractStatus.Active),

                Expired = contracts.Count(x => x.Status == ContractStatus.Expired),

                ExpiringSoon = contracts.Count(x =>
                    x.Status == ContractStatus.Active &&
                    x.EndDate <= DateTime.UtcNow.AddDays(30))
            };
        }
    }
}