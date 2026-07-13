using VendorContractManagement.Application.DTOs.Expenditure;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface IExpenditureService
{
    Task<ExpenditureDto> CreateAsync(
        CreateExpenditureDto dto);

    Task<ExpenditureDto> UpdateAsync(
        int id,
        UpdateExpenditureDto dto);

    Task DeleteAsync(int id);

    Task<ExpenditureDto?> GetByIdAsync(int id);

    Task<List<ExpenditureDto>> GetAllAsync();

    Task<List<ExpenditureDto>> SearchAsync(
    ExpenditureFilterDto filter);

    Task<ExpenditureDashboardDto> GetDashboardAsync();

    Task<ExpenditureForecastDto> GetForecastAsync(
        int year);
}