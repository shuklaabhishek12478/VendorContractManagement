using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs.Reports;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Enums;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class ReportRepository : IReportRepository
{
    private readonly AppDbContext _context;

    public ReportRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ReportSummaryDto> GetSummaryAsync(
    ReportFilterDto filter)
    {
        var vendors = _context.Vendors
            .Where(x => !x.IsDeleted);

        var contracts = _context.Contracts
            .Where(x => !x.IsDeleted);

        var expenditures = _context.Expenditures
            .Where(x => !x.IsDeleted);

        return new ReportSummaryDto
        {
            TotalVendors =
                await vendors.CountAsync(),

            ActiveVendors =
                await vendors.CountAsync(x => x.IsActive),

            TotalContracts =
                await contracts.CountAsync(),

            ActiveContracts =
                await contracts.CountAsync(x =>
                    x.Status == ContractStatus.Active),

            TotalExpenses =
                await expenditures.CountAsync(),

            PaidExpenses =
                await expenditures.CountAsync(x =>
                    x.PaymentStatus == PaymentStatus.Paid),

            PendingExpenses =
                await expenditures.CountAsync(x =>
                    x.PaymentStatus == PaymentStatus.Pending),

            TotalSpend =
                await expenditures.SumAsync(x =>
                    (decimal?)x.TotalAmount) ?? 0,

            PaidAmount =
                await expenditures
                    .Where(x => x.PaymentStatus == PaymentStatus.Paid)
                    .SumAsync(x => (decimal?)x.TotalAmount) ?? 0,

            PendingAmount =
                await expenditures
                    .Where(x => x.PaymentStatus == PaymentStatus.Pending)
                    .SumAsync(x => (decimal?)x.TotalAmount) ?? 0
        };
    }

    public async Task<List<MonthlyReportDto>> GetMonthlySpendAsync(
    ReportFilterDto filter)
    {
        return await _context.Expenditures
            .Where(x => !x.IsDeleted)
            .GroupBy(x => new
            {
                x.ExpenseDate.Year,
                x.ExpenseDate.Month
            })
            .Select(g => new MonthlyReportDto
            {
                Month = $"{g.Key.Month}/{g.Key.Year}",

                Spend = g.Sum(x => x.TotalAmount),

                Contracts = g
                    .Select(x => x.ContractId)
                    .Distinct()
                    .Count(),

                Vendors = g
                    .Select(x => x.VendorId)
                    .Distinct()
                    .Count()
            })
            .OrderBy(x => x.Month)
            .ToListAsync();
    }

    public async Task<List<VendorReportDto>> GetVendorSpendAsync(
    ReportFilterDto filter)
    {
        return await _context.Expenditures

            .Include(x => x.Vendor)

            .Where(x => !x.IsDeleted)

            .GroupBy(x => new
            {
                x.VendorId,
                x.Vendor.CompanyName
            })

            .Select(g => new VendorReportDto
            {
                VendorId = g.Key.VendorId,

                VendorName = g.Key.CompanyName,

                Spend = g.Sum(x => x.TotalAmount),

                Expenses = g.Count(),

                Contracts =
                    g.Where(x => x.ContractId != null)
                     .Select(x => x.ContractId)
                     .Distinct()
                     .Count()
            })

            .OrderByDescending(x => x.Spend)

            .ToListAsync();
    }

    public async Task<List<DepartmentReportDto>>
GetDepartmentSpendAsync(
    ReportFilterDto filter)
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => x.Department)

            .Select(g => new DepartmentReportDto
            {
                Department = g.Key.ToString(),

                Spend = g.Sum(x => x.TotalAmount),

                Expenses = g.Count()
            })

            .OrderByDescending(x => x.Spend)

            .ToListAsync();
    }

    public async Task<List<CategoryReportDto>>
GetCategorySpendAsync(
    ReportFilterDto filter)
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => x.Category)

            .Select(g => new CategoryReportDto
            {
                Category = g.Key.ToString(),

                Spend = g.Sum(x => x.TotalAmount),

                Expenses = g.Count()
            })

            .OrderByDescending(x => x.Spend)

            .ToListAsync();
    }


    public async Task<List<ContractReportDto>> GetContractsAsync(
    ReportFilterDto filter)
    {
        var query = _context.Contracts
            .Include(x => x.Vendor)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (filter.VendorId.HasValue)
        {
            query = query.Where(x =>
                x.VendorId == filter.VendorId.Value);
        }

        if (filter.ContractId.HasValue)
        {
            query = query.Where(x =>
                x.Id == filter.ContractId.Value);
        }

        if (filter.FromDate.HasValue)
        {
            query = query.Where(x =>
                x.StartDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            query = query.Where(x =>
                x.EndDate <= filter.ToDate.Value);
        }

        return await query
            .OrderByDescending(x => x.CreatedOn)
            .Select(x => new ContractReportDto
            {
                ContractId = x.Id,
                ContractNumber = x.ContractNumber,
                VendorName = x.Vendor.CompanyName,
                Status = x.Status.ToString(),
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                ContractValue = x.ContractValue
            })
            .ToListAsync();
    }


    public async Task<List<ExpenditureReportDto>> GetExpendituresAsync(
    ReportFilterDto filter)
    {
        var query = _context.Expenditures
            .Include(x => x.Vendor)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (filter.VendorId.HasValue)
        {
            query = query.Where(x =>
                x.VendorId == filter.VendorId.Value);
        }

        if (filter.ContractId.HasValue)
        {
            query = query.Where(x =>
                x.ContractId == filter.ContractId.Value);
        }

        if (filter.Department.HasValue)
        {
            query = query.Where(x =>
                x.Department == filter.Department.Value);
        }

        if (filter.Category.HasValue)
        {
            query = query.Where(x =>
                x.Category == filter.Category.Value);
        }

        if (filter.PaymentStatus.HasValue)
        {
            query = query.Where(x =>
                x.PaymentStatus == filter.PaymentStatus.Value);
        }

        if (filter.Status.HasValue)
        {
            query = query.Where(x =>
                x.Status == filter.Status.Value);
        }

        if (filter.FromDate.HasValue)
        {
            query = query.Where(x =>
                x.ExpenseDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            query = query.Where(x =>
                x.ExpenseDate <= filter.ToDate.Value);
        }

        return await query
            .OrderByDescending(x => x.ExpenseDate)
            .Select(x => new ExpenditureReportDto
            {
                ExpenditureId = x.Id,
                ExpenseNumber = x.ExpenseNumber,
                VendorName = x.Vendor.CompanyName,
                Department = x.Department.ToString(),
                Category = x.Category.ToString(),
                Amount = x.Amount,
                TaxAmount = x.TaxAmount,
                TotalAmount = x.TotalAmount,
                ExpenseDate = x.ExpenseDate
            })
            .ToListAsync();
    }

    public async Task<List<ContractReportDto>> ExportContractsAsync(
    ReportFilterDto filter)
    {
        return await GetContractsAsync(filter);
    }

    public async Task<List<ExpenditureReportDto>> ExportExpendituresAsync(
    ReportFilterDto filter)
    {
        return await GetExpendituresAsync(filter);
    }

    public async Task<List<VendorReportDto>> GetVendorReportAsync(
    ReportFilterDto filter)
    {
        var vendors =
            _context.Vendors
            .Where(v => !v.IsDeleted)
            .AsQueryable();

        if (filter.VendorId.HasValue)
        {
            vendors = vendors.Where(v =>
                v.Id == filter.VendorId.Value);
        }

        var result =
            await vendors
            .Select(v => new VendorReportDto
            {
                VendorId = v.Id,

                VendorName = v.CompanyName,

                Spend = _context.Expenditures
                    .Where(e =>
                        !e.IsDeleted &&
                        e.VendorId == v.Id)
                    .Sum(e => (decimal?)e.TotalAmount) ?? 0,

                Contracts = _context.Contracts
                    .Count(c =>
                        !c.IsDeleted &&
                        c.VendorId == v.Id),

                Expenses = _context.Expenditures
                    .Count(e =>
                        !e.IsDeleted &&
                        e.VendorId == v.Id),

                CreatedOn = v.CreatedOn
            })
            .OrderByDescending(x => x.Spend)
            .ToListAsync();

        return result;
    }

    public async Task<List<DepartmentReportDto>> GetDepartmentReportAsync(
    ReportFilterDto filter)
    {
        var query = _context.Expenditures
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (filter.FromDate.HasValue)
            query = query.Where(x => x.ExpenseDate >= filter.FromDate.Value);

        if (filter.ToDate.HasValue)
            query = query.Where(x => x.ExpenseDate <= filter.ToDate.Value);

        if (filter.VendorId.HasValue)
            query = query.Where(x => x.VendorId == filter.VendorId.Value);

        if (filter.Department.HasValue)
            query = query.Where(x => x.Department == filter.Department.Value);

        return await query
            .GroupBy(x => x.Department)
            .Select(g => new DepartmentReportDto
            {
                Department = g.Key.ToString(),
                Spend = g.Sum(x => x.TotalAmount),
                Expenses = g.Count()
            })
            .OrderByDescending(x => x.Spend)
            .ToListAsync();
    }


    public async Task<List<CategoryReportDto>> GetCategoryReportAsync(
    ReportFilterDto filter)
    {
        var query = _context.Expenditures
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (filter.FromDate.HasValue)
        {
            query = query.Where(x =>
                x.ExpenseDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            query = query.Where(x =>
                x.ExpenseDate <= filter.ToDate.Value);
        }

        if (filter.VendorId.HasValue)
        {
            query = query.Where(x =>
                x.VendorId == filter.VendorId.Value);
        }

        if (filter.Department.HasValue)
        {
            query = query.Where(x =>
                x.Department == filter.Department.Value);
        }

        if (filter.Category.HasValue)
        {
            query = query.Where(x =>
                x.Category == filter.Category.Value);
        }

        return await query
            .GroupBy(x => x.Category)
            .Select(g => new CategoryReportDto
            {
                Category = g.Key.ToString(),

                Spend = g.Sum(x => x.TotalAmount),

                Expenses = g.Count()
            })
            .OrderByDescending(x => x.Spend)
            .ToListAsync();
    }

    public async Task<List<MonthlyReportDto>> GetMonthlyReportAsync(
    ReportFilterDto filter)
    {
        var expenditures = _context.Expenditures
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (filter.FromDate.HasValue)
        {
            expenditures = expenditures.Where(x =>
                x.ExpenseDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            expenditures = expenditures.Where(x =>
                x.ExpenseDate <= filter.ToDate.Value);
        }

        if (filter.VendorId.HasValue)
        {
            expenditures = expenditures.Where(x =>
                x.VendorId == filter.VendorId.Value);
        }

        var contracts = _context.Contracts.AsQueryable();

        if (filter.FromDate.HasValue)
        {
            contracts = contracts.Where(x =>
                x.StartDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            contracts = contracts.Where(x =>
                x.StartDate <= filter.ToDate.Value);
        }

        var vendors = _context.Vendors.AsQueryable();

        if (filter.FromDate.HasValue)
        {
            vendors = vendors.Where(x =>
                x.CreatedOn >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            vendors = vendors.Where(x =>
                x.CreatedOn <= filter.ToDate.Value);
        }

        var expenseData = await expenditures
            .GroupBy(x => new
            {
                x.ExpenseDate.Year,
                x.ExpenseDate.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Spend = g.Sum(x => x.TotalAmount)
            })
            .ToListAsync();

        var contractData = await contracts
            .GroupBy(x => new
            {
                x.StartDate.Year,
                x.StartDate.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Count = g.Count()
            })
            .ToListAsync();

        var vendorData = await vendors
            .GroupBy(x => new
            {
                x.CreatedOn.Year,
                x.CreatedOn.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Count = g.Count()
            })
            .ToListAsync();

        var result = expenseData
            .Select(x => new MonthlyReportDto
            {
                Month = new DateTime(x.Year, x.Month, 1)
                    .ToString("MMM yyyy"),

                Spend = x.Spend,

                Contracts = contractData
                    .FirstOrDefault(c =>
                        c.Year == x.Year &&
                        c.Month == x.Month)?.Count ?? 0,

                Vendors = vendorData
                    .FirstOrDefault(v =>
                        v.Year == x.Year &&
                        v.Month == x.Month)?.Count ?? 0
            })
            .OrderBy(x =>
                DateTime.ParseExact(
                    x.Month,
                    "MMM yyyy",
                    System.Globalization.CultureInfo.InvariantCulture))
            .ToList();

        return result;
    }


    


}