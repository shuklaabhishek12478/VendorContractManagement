using VendorContractManagement.Application.DTOs.Reports;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface IReportService
{
    Task<ReportDashboardDto> GetDashboardAsync(
        ReportFilterDto filter);

    Task<List<ContractReportDto>> GetContractsAsync(
        ReportFilterDto filter);

    Task<List<ExpenditureReportDto>> GetExpendituresAsync(
        ReportFilterDto filter);

    Task<byte[]> ExportContractExcelAsync(
        ReportFilterDto filter);

    Task<byte[]> ExportExpenditureExcelAsync(
        ReportFilterDto filter);

    Task<List<VendorReportDto>> GetVendorsAsync(
    ReportFilterDto filter);

    Task<byte[]> ExportVendorExcelAsync(
    ReportFilterDto filter);

    Task<List<DepartmentReportDto>> GetDepartmentsAsync(
    ReportFilterDto filter);

    Task<byte[]> ExportDepartmentExcelAsync(
    ReportFilterDto filter);

    Task<List<CategoryReportDto>> GetCategoriesAsync(
    ReportFilterDto filter);

    Task<byte[]> ExportCategoryExcelAsync(
    ReportFilterDto filter);

    Task<List<MonthlyReportDto>> GetMonthlyAsync(
    ReportFilterDto filter);

    Task<byte[]> ExportMonthlyExcelAsync(
    ReportFilterDto filter);

    
}