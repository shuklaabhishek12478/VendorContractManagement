using VendorContractManagement.Application.DTOs.Reports;

namespace VendorContractManagement.Application.Interfaces;

public interface IReportRepository
{
    // Dashboard

    Task<ReportSummaryDto> GetSummaryAsync(
        ReportFilterDto filter);

    Task<List<MonthlyReportDto>> GetMonthlySpendAsync(
        ReportFilterDto filter);

    Task<List<VendorReportDto>> GetVendorSpendAsync(
        ReportFilterDto filter);

    Task<List<DepartmentReportDto>> GetDepartmentSpendAsync(
        ReportFilterDto filter);

    Task<List<CategoryReportDto>> GetCategorySpendAsync(
        ReportFilterDto filter);


    // Detail Reports

    Task<List<ContractReportDto>> GetContractsAsync(
        ReportFilterDto filter);

    Task<List<ExpenditureReportDto>> GetExpendituresAsync(
        ReportFilterDto filter);


    // Export

    Task<List<ExpenditureReportDto>> ExportExpendituresAsync(
        ReportFilterDto filter);

    Task<List<ContractReportDto>> ExportContractsAsync(
        ReportFilterDto filter);

    Task<List<VendorReportDto>> GetVendorReportAsync(
    ReportFilterDto filter);

    Task<List<DepartmentReportDto>> GetDepartmentReportAsync(
    ReportFilterDto filter);

    Task<List<CategoryReportDto>> GetCategoryReportAsync(
    ReportFilterDto filter);

    Task<List<MonthlyReportDto>> GetMonthlyReportAsync(
    ReportFilterDto filter);

    
}