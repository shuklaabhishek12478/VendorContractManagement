using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository
{
    public class ContractRepository : IContractRepository
    {
        private readonly AppDbContext _context;

        public ContractRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contract>> GetAllAsync()
        {
            return await _context.Contracts
                 .Where(c => !c.IsDeleted)
                 .Include(c => c.Vendor)
                 .ToListAsync();
        }

        public async Task<Contract?> GetByIdAsync(int id)
        {
            return await _context.Contracts
               .Include(c => c.Vendor)
               .FirstOrDefaultAsync(
                 c => c.Id == id && !c.IsDeleted);
        }

        public async Task AddAsync(Contract contract)
        {
            await _context.Contracts.AddAsync(contract);
        }

        public void Update(Contract contract)
        {
            _context.Contracts.Update(contract);
        }

        public void Delete(Contract contract)
        {
            _context.Contracts.Remove(contract);
        }

        public async Task<IEnumerable<Contract>> GetExpiringSoonAsync(int days)
        {
            var targetDate = DateTime.UtcNow.AddDays(days);

            return await _context.Contracts
                .Where(c =>
                    !c.IsDeleted &&
                    c.Status == ContractStatus.Active &&
                    c.EndDate <= targetDate &&
                    c.EndDate >= DateTime.UtcNow)
                .Include(c => c.Vendor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetByVendorIdAsync(int vendorId)
        {
            return await _context.Contracts
                .Where(x =>
                    !x.IsDeleted &&
                    x.VendorId == vendorId)
                .Include(x => x.Vendor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetExpiredAsync()
        {
            return await _context.Contracts
                .Where(c =>
                    !c.IsDeleted &&
                    c.Status == ContractStatus.Expired)
                .Include(c => c.Vendor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetActiveAsync()
        {
            return await _context.Contracts
                .Where(c =>
                    !c.IsDeleted &&
                    c.Status == ContractStatus.Active)
                .Include(c => c.Vendor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetPendingApprovalAsync()
        {
            return await _context.Contracts
                .Where(x =>
                    !x.IsDeleted &&
                    x.Status == ContractStatus.PendingApproval)
                .Include(x => x.Vendor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetActiveContractsAsync()
        {
            return await _context.Contracts
                .Where(c =>
                    !c.IsDeleted &&
                    c.Status == ContractStatus.Active)
                .Include(c => c.Vendor)
                .ToListAsync();
        }

        public async Task<(IEnumerable<Contract>, int)>GetPagedAsync(ContractQueryParams query)
        {
            var contracts = _context.Contracts
                .Include(c => c.Vendor)
                .Where(c => !c.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                contracts = contracts.Where(c =>
                    c.ContractNumber.Contains(query.Search));
            }

            if (query.Status.HasValue)
            {
                contracts = contracts.Where(c =>
                    c.Status == query.Status.Value);
            }

            if (query.VendorId.HasValue)
            {
                contracts = contracts.Where(c =>
                    c.VendorId == query.VendorId.Value);
            }

            var totalCount =
                await contracts.CountAsync();

            var result =
                await contracts
                    .OrderByDescending(c => c.Id)
                    .Skip((query.PageNumber - 1)
                            * query.PageSize)
                    .Take(query.PageSize)
                    .ToListAsync();

            return (result, totalCount);
        }


        public async Task<IEnumerable<Contract>>GetRenewalsAsync(int parentContractId)
        {
            return await _context.Contracts
                .Where(x =>
                    x.ParentContractId ==
                    parentContractId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetReportDataAsync(ContractReportFilterDto filter)
        {
            var query = _context.Contracts
                .Include(c => c.Vendor)
                .Where(c => !c.IsDeleted)
                .AsQueryable();

            if (filter.Status.HasValue)
            {
                query = query.Where(c =>
                    c.Status == filter.Status.Value);
            }

            if (filter.VendorId.HasValue)
            {
                query = query.Where(c =>
                    c.VendorId == filter.VendorId.Value);
            }

            if (filter.StartDate.HasValue)
            {
                query = query.Where(c =>
                    c.StartDate >= filter.StartDate.Value);
            }

            if (filter.EndDate.HasValue)
            {
                query = query.Where(c =>
                    c.EndDate <= filter.EndDate.Value);
            }

            if (filter.MinContractValue.HasValue)
            {
                query = query.Where(c =>
                    c.ContractValue >= filter.MinContractValue.Value);
            }

            if (filter.MaxContractValue.HasValue)
            {
                query = query.Where(c =>
                    c.ContractValue <= filter.MaxContractValue.Value);
            }

            return await query.ToListAsync();
        }


        public async Task<IEnumerable<TopVendorDto>>
    GetTopVendorsAsync(int count)
        {
            return await _context.Contracts
                .Where(c => !c.IsDeleted)
                .GroupBy(c => new
                {
                    c.VendorId,
                    c.Vendor.VendorName
                })
                .Select(g => new TopVendorDto
                {
                    VendorName = g.Key.VendorName,
                    TotalContractValue =
                        g.Sum(x => x.ContractValue)
                })
                .OrderByDescending(x =>
                    x.TotalContractValue)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<ContractStatusAnalyticsDto>>GetStatusDistributionAsync()
        {
            return await _context.Contracts
                .Where(x => !x.IsDeleted)
                .GroupBy(x => x.Status)
                .Select(g => new ContractStatusAnalyticsDto
                {
                    Status = g.Key.ToString(),
                    Count = g.Count()
                })
                .OrderBy(x => x.Status)
                .ToListAsync();
        }


        public async Task<IEnumerable<MonthlyContractTrendDto>>GetMonthlyContractTrendAsync()
        {
            return await _context.Contracts
                .Where(x => !x.IsDeleted)
                .GroupBy(x => new
                {
                    x.CreatedOn.Year,
                    x.CreatedOn.Month
                })
                .Select(g => new MonthlyContractTrendDto
                {
                    Month =
                        $"{g.Key.Year}-{g.Key.Month:D2}",

                    TotalContracts =
                        g.Count()
                })
                .OrderBy(x => x.Month)
                .ToListAsync();
        }



        public async Task<IEnumerable<ContractValueTrendDto>>GetContractValueTrendAsync()
        {
            return await _context.Contracts
                .Where(x => !x.IsDeleted)
                .GroupBy(x => new
                {
                    x.CreatedOn.Year,
                    x.CreatedOn.Month
                })
                .Select(g => new ContractValueTrendDto
                {
                    Month =
                        $"{g.Key.Year}-{g.Key.Month:D2}",

                    TotalValue =
                        g.Sum(x => x.ContractValue)
                })
                .OrderBy(x => x.Month)
                .ToListAsync();
        }



        public async Task<ExpiryAnalyticsDto>
    GetExpiryAnalyticsAsync()
        {
            var today = DateTime.UtcNow;

            var activeContracts =
                await _context.Contracts
                    .Where(x =>
                        !x.IsDeleted &&
                        x.Status == ContractStatus.Active)
                    .ToListAsync();

            return new ExpiryAnalyticsDto
            {
                Next7Days =
                    activeContracts.Count(x =>
                        x.EndDate <= today.AddDays(7)
                        &&
                        x.EndDate >= today),

                Next15Days =
                    activeContracts.Count(x =>
                        x.EndDate <= today.AddDays(15)
                        &&
                        x.EndDate >= today),

                Next30Days =
                    activeContracts.Count(x =>
                        x.EndDate <= today.AddDays(30)
                        &&
                        x.EndDate >= today)
            };
        }

        public async Task<int> GetContractCountAsync()
        {
            return await _context.Contracts.CountAsync();
        }

        public async Task<string> GenerateContractNumberAsync()
        {
            var count = await _context.Contracts.CountAsync();

            return $"CNT-{DateTime.UtcNow.Year}-{(count + 1):D4}";
        }

    }
    
}