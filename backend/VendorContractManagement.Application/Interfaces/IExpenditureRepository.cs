using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces;

public interface IExpenditureRepository
{
    

    Task AddAsync(Expenditure expenditure);

    void Update(Expenditure expenditure);

    void Delete(Expenditure expenditure);

    Task<Expenditure?> GetByIdAsync(int id);

    Task<Expenditure?> GetByExpenseNumberAsync(string expenseNumber);

    // Listing

    Task<List<Expenditure>> GetAllAsync();

    Task<List<Expenditure>> SearchAsync(
    ExpenditureFilterDto filter);

    Task<ExpenditureSummaryDto> GetSummaryAsync();

    Task<List<MonthlySpendDto>> GetMonthlySpendAsync();

    Task<List<DepartmentSpendDto>> GetDepartmentSpendAsync();

    Task<List<VendorSpendDto>> GetVendorSpendAsync();

    Task<List<CategorySpendDto>> GetCategorySpendAsync();


    Task<ExpenditureForecastDto> GetForecastAsync(int year);

    Task<Expenditure?> GetByInvoiceNumberAsync(
    string invoiceNumber);

    Task<bool> IsInvoiceExistsAsync(
        string invoiceNumber,
        int? excludeId = null);

    Task<string?> GetLastExpenseNumberAsync();
}