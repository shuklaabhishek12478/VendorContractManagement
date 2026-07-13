using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class ExpenditureRepository : IExpenditureRepository
{
    private readonly AppDbContext _context;

    public async Task<List<Expenditure>> GetAllAsync()
    {
        return await _context.Expenditures

            .Include(x => x.Vendor)

            .Include(x => x.Contract)

            .Where(x => !x.IsDeleted)

            .OrderByDescending(x => x.CreatedOn)

            .ToListAsync();
    }

    public ExpenditureRepository(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<Expenditure?> GetByIdAsync(
    int id)
    {
        return await _context.Expenditures

            .Include(x => x.Vendor)

            .Include(x => x.Contract)

            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                !x.IsDeleted);
    }

    public async Task<Expenditure?> GetByExpenseNumberAsync(
    string expenseNumber)
    {
        return await _context.Expenditures

            .FirstOrDefaultAsync(x =>

                x.ExpenseNumber == expenseNumber &&

                !x.IsDeleted);
    }

    public async Task AddAsync(
    Expenditure expenditure)
    {
        await _context.Expenditures
            .AddAsync(expenditure);
    }

    public void Update(
    Expenditure expenditure)
    {
        _context.Expenditures
            .Update(expenditure);
    }

    public void Delete(
    Expenditure expenditure)
    {
        expenditure.IsDeleted = true;

        expenditure.IsActive = false;

        expenditure.UpdatedOn = DateTime.UtcNow;

        _context.Expenditures
            .Update(expenditure);
    }

    public async Task<List<Expenditure>> SearchAsync(
     ExpenditureFilterDto filter)
    {
        var query = _context.Expenditures

            .Include(x => x.Vendor)

            .Include(x => x.Contract)

            .Where(x => !x.IsDeleted)

            .AsQueryable();

        // Keyword Search

        if (!string.IsNullOrWhiteSpace(filter.Keyword))
        {
            var keyword = filter.Keyword.Trim();

            query = query.Where(x =>

                x.Title.Contains(keyword) ||

                x.ExpenseNumber.Contains(keyword) ||

                x.InvoiceNumber.Contains(keyword) ||

                x.Vendor.CompanyName.Contains(keyword));
        }

        // Vendor

        if (filter.VendorId.HasValue)
        {
            query = query.Where(x =>
                x.VendorId == filter.VendorId.Value);
        }

        // Contract

        if (filter.ContractId.HasValue)
        {
            query = query.Where(x =>
                x.ContractId == filter.ContractId.Value);
        }

        // Department

        if (filter.Department.HasValue)
        {
            query = query.Where(x =>
                (int)x.Department == filter.Department.Value);
        }

        // Cost Center

        if (filter.CostCenter.HasValue)
        {
            query = query.Where(x =>
                (int)x.CostCenter == filter.CostCenter.Value);
        }

        // Category

        if (filter.Category.HasValue)
        {
            query = query.Where(x =>
                (int)x.Category == filter.Category.Value);
        }

        // Expense Type

        if (filter.ExpenseType.HasValue)
        {
            query = query.Where(x =>
                (int)x.ExpenseType == filter.ExpenseType.Value);
        }

        // Payment Status

        if (filter.PaymentStatus.HasValue)
        {
            query = query.Where(x =>
                (int)x.PaymentStatus == filter.PaymentStatus.Value);
        }

        // Status

        if (filter.Status.HasValue)
        {
            query = query.Where(x =>
                (int)x.Status == filter.Status.Value);
        }

        // Date Range

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

        // Amount Range

        if (filter.MinAmount.HasValue)
        {
            query = query.Where(x =>
                x.TotalAmount >= filter.MinAmount.Value);
        }

        if (filter.MaxAmount.HasValue)
        {
            query = query.Where(x =>
                x.TotalAmount <= filter.MaxAmount.Value);
        }

        // Sorting

        query = filter.Descending

            ? query.OrderByDescending(x => x.ExpenseDate)
                   .ThenByDescending(x => x.CreatedOn)

            : query.OrderBy(x => x.ExpenseDate)
                   .ThenBy(x => x.CreatedOn);

        // Pagination

        query = query

            .Skip((filter.Page - 1) * filter.PageSize)

            .Take(filter.PageSize);

        return await query.ToListAsync();
    }

    public async Task<ExpenditureSummaryDto> GetSummaryAsync()
    {
        var expenditures = _context.Expenditures
            .Where(x => !x.IsDeleted);

        var totalSpend = await expenditures
            .SumAsync(x => x.TotalAmount);

        var paidAmount = await expenditures
            .Where(x => x.PaymentStatus == PaymentStatus.Paid)
            .SumAsync(x => x.TotalAmount);

        var pendingAmount = await expenditures
            .Where(x => x.PaymentStatus == PaymentStatus.Pending)
            .SumAsync(x => x.TotalAmount);

        var forecastAmount = await expenditures
            .Where(x => x.IsForecasted)
            .SumAsync(x => x.TotalAmount);

        var overdueExpenses = await expenditures
            .CountAsync(x =>
                x.DueDate < DateTime.UtcNow &&
                x.PaymentStatus != PaymentStatus.Paid);

        return new ExpenditureSummaryDto
        {
            TotalSpend = totalSpend,
            PaidAmount = paidAmount,
            PendingAmount = pendingAmount,
            ForecastAmount = forecastAmount,

            // Temporary values
            Budget = 0,
            RemainingBudget = 0,

            TotalExpenses = await expenditures.CountAsync(),

            PaidExpenses = await expenditures
                .CountAsync(x =>
                    x.PaymentStatus == PaymentStatus.Paid),

            PendingExpenses = await expenditures
                .CountAsync(x =>
                    x.PaymentStatus == PaymentStatus.Pending),

            OverdueExpenses = overdueExpenses
        };
    }

    public async Task<List<MonthlySpendDto>> GetMonthlySpendAsync()
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => new
            {
                x.ExpenseDate.Year,
                x.ExpenseDate.Month
            })

            .Select(g => new MonthlySpendDto
            {
                Month = $"{g.Key.Month}/{g.Key.Year}",

                Actual = g
                    .Where(x => !x.IsForecasted)
                    .Sum(x => x.TotalAmount),

                Forecast = g
                    .Where(x => x.IsForecasted)
                    .Sum(x => x.TotalAmount)
            })

            .OrderBy(x => x.Month)

            .ToListAsync();
    }

    public async Task<List<DepartmentSpendDto>> GetDepartmentSpendAsync()
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => x.Department)

            .Select(g => new DepartmentSpendDto
            {
                Department = g.Key.ToString(),

                Amount = g.Sum(x => x.TotalAmount)
            })

            .OrderByDescending(x => x.Amount)

            .ToListAsync();
    }

    public async Task<List<VendorSpendDto>> GetVendorSpendAsync()
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => x.Vendor.CompanyName)

            .Select(g => new VendorSpendDto
            {
                VendorName = g.Key,

                Amount = g.Sum(x => x.TotalAmount)
            })

            .OrderByDescending(x => x.Amount)

            .Take(10)

            .ToListAsync();
    }

    public async Task<List<CategorySpendDto>> GetCategorySpendAsync()
    {
        return await _context.Expenditures

            .Where(x => !x.IsDeleted)

            .GroupBy(x => x.Category)

            .Select(g => new CategorySpendDto
            {
                Category = g.Key.ToString(),

                Amount = g.Sum(x => x.TotalAmount)
            })

            .OrderByDescending(x => x.Amount)

            .ToListAsync();
    }

    public async Task<ExpenditureForecastDto> GetForecastAsync(
    int year)
    {
        var expenditures = await _context.Expenditures

            .Where(x =>
                !x.IsDeleted &&
                x.ExpenseDate.Year == year)

            .ToListAsync();

        decimal currentSpend =
            expenditures.Sum(x => x.TotalAmount);

        decimal forecastSpend =
            expenditures
                .Where(x => x.IsForecasted)
                .Sum(x => x.TotalAmount);

        // Temporary Budget
        decimal budget = 10000000m;

        decimal remainingBudget =
            budget - currentSpend;

        decimal utilization =
            budget == 0
                ? 0
                : (currentSpend / budget) * 100;

        int monthsPassed = DateTime.UtcNow.Year == year
            ? DateTime.UtcNow.Month
            : 12;

        if (monthsPassed == 0)
            monthsPassed = 1;

        decimal monthlyBurnRate =
            currentSpend / monthsPassed;

        decimal estimatedYearEndSpend =
            monthlyBurnRate * 12;

        return new ExpenditureForecastDto
        {
            Year = year,

            CurrentSpend = currentSpend,

            ForecastSpend = forecastSpend,

            Budget = budget,

            RemainingBudget = remainingBudget,

            BudgetUtilizationPercentage =
                Math.Round(utilization, 2),

            MonthlyBurnRate =
                Math.Round(monthlyBurnRate, 2),

            EstimatedYearEndSpend =
                Math.Round(estimatedYearEndSpend, 2)
        };
    }

    public async Task<Expenditure?> GetByInvoiceNumberAsync(
    string invoiceNumber)
    {
        return await _context.Expenditures

            .FirstOrDefaultAsync(x =>

                !x.IsDeleted &&

                x.InvoiceNumber == invoiceNumber);
    }

    public async Task<bool> IsInvoiceExistsAsync(
    string invoiceNumber,
    int? excludeId = null)
    {
        var query = _context.Expenditures
            .Where(x =>
                !x.IsDeleted &&
                x.InvoiceNumber == invoiceNumber);

        if (excludeId.HasValue)
        {
            query = query.Where(x =>
                x.Id != excludeId.Value);
        }

        return await query.AnyAsync();
    }

    public async Task<string?> GetLastExpenseNumberAsync()
    {
        return await _context.Expenditures

            .OrderByDescending(x => x.Id)

            .Select(x => x.ExpenseNumber)

            .FirstOrDefaultAsync();
    }
}