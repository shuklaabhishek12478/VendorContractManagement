using ClosedXML.Excel;
using VendorContractManagement.Application.DTOs.Reports;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.Application.Services.Implementations;

public class ReportService : IReportService
{
    private readonly IReportRepository _repository;

    public ReportService(
        IReportRepository repository)
    {
        _repository = repository;
    }

    public async Task<ReportDashboardDto> GetDashboardAsync(
        ReportFilterDto filter)
    {
        return new ReportDashboardDto
        {
            Summary =
                await _repository.GetSummaryAsync(filter),

            MonthlySpend =
                await _repository.GetMonthlySpendAsync(filter),

            VendorSpend =
                await _repository.GetVendorSpendAsync(filter),

            DepartmentSpend =
                await _repository.GetDepartmentSpendAsync(filter),

            CategorySpend =
                await _repository.GetCategorySpendAsync(filter)
        };
    }

    public async Task<List<ContractReportDto>> GetContractsAsync(
        ReportFilterDto filter)
    {
        return await _repository.GetContractsAsync(filter);
    }

    public async Task<List<ExpenditureReportDto>> GetExpendituresAsync(
        ReportFilterDto filter)
    {
        return await _repository.GetExpendituresAsync(filter);
    }

    public async Task<byte[]> ExportContractExcelAsync(
        ReportFilterDto filter)
    {
        var contracts =
            await _repository.ExportContractsAsync(filter);

        using var workbook = new XLWorkbook();

        var ws =
            workbook.Worksheets.Add("Contracts");

        ws.Cell(1, 1).Value = "Contract Number";
        ws.Cell(1, 2).Value = "Vendor";
        ws.Cell(1, 3).Value = "Status";
        ws.Cell(1, 4).Value = "Start Date";
        ws.Cell(1, 5).Value = "End Date";
        ws.Cell(1, 6).Value = "Value";

        ws.Range(1, 1, 1, 6).Style.Font.Bold = true;

        int row = 2;

        foreach (var item in contracts)
        {
            ws.Cell(row, 1).Value = item.ContractNumber;
            ws.Cell(row, 2).Value = item.VendorName;
            ws.Cell(row, 3).Value = item.Status;
            ws.Cell(row, 4).Value = item.StartDate;
            ws.Cell(row, 5).Value = item.EndDate;
            ws.Cell(row, 6).Value = item.ContractValue;

            row++;
        }

        ws.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    public async Task<byte[]> ExportExpenditureExcelAsync(
        ReportFilterDto filter)
    {
        var data =
            await _repository.ExportExpendituresAsync(filter);

        using var workbook = new XLWorkbook();

        var ws =
            workbook.Worksheets.Add("Expenditures");

        ws.Cell(1, 1).Value = "Expense Number";
        ws.Cell(1, 2).Value = "Vendor";
        ws.Cell(1, 3).Value = "Department";
        ws.Cell(1, 4).Value = "Category";
        ws.Cell(1, 5).Value = "Amount";
        ws.Cell(1, 6).Value = "Tax";
        ws.Cell(1, 7).Value = "Total";
        ws.Cell(1, 8).Value = "Expense Date";

        ws.Range(1, 1, 1, 8).Style.Font.Bold = true;

        int row = 2;

        foreach (var item in data)
        {
            ws.Cell(row, 1).Value = item.ExpenseNumber;
            ws.Cell(row, 2).Value = item.VendorName;
            ws.Cell(row, 3).Value = item.Department;
            ws.Cell(row, 4).Value = item.Category;
            ws.Cell(row, 5).Value = item.Amount;
            ws.Cell(row, 6).Value = item.TaxAmount;
            ws.Cell(row, 7).Value = item.TotalAmount;
            ws.Cell(row, 8).Value = item.ExpenseDate;

            row++;
        }

        ws.Column(8).Style.DateFormat.Format =
            "dd-MMM-yyyy";

        ws.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    public async Task<List<VendorReportDto>>
GetVendorsAsync(
    ReportFilterDto filter)
    {
        return await _repository
            .GetVendorReportAsync(filter);
    }

    public async Task<byte[]> ExportVendorExcelAsync(
    ReportFilterDto filter)
    {
        var vendors =
            await _repository.GetVendorReportAsync(filter);

        using var workbook =
            new XLWorkbook();

        var sheet =
            workbook.Worksheets.Add("Vendor Report");

        sheet.Cell(1, 1).Value = "Vendor";
        sheet.Cell(1, 2).Value = "Spend";
        sheet.Cell(1, 3).Value = "Contracts";
        sheet.Cell(1, 4).Value = "Expenses";
        sheet.Cell(1, 5).Value = "Created On";

        int row = 2;

        foreach (var item in vendors)
        {
            sheet.Cell(row, 1).Value = item.VendorName;
            sheet.Cell(row, 2).Value = item.Spend;
            sheet.Cell(row, 3).Value = item.Contracts;
            sheet.Cell(row, 4).Value = item.Expenses;
            sheet.Cell(row, 5).Value = item.CreatedOn;

            row++;
        }

        sheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    public async Task<List<DepartmentReportDto>>
GetDepartmentsAsync(
    ReportFilterDto filter)
    {
        return await _repository
            .GetDepartmentReportAsync(filter);
    }

    public async Task<byte[]> ExportDepartmentExcelAsync(
    ReportFilterDto filter)
    {
        var data =
            await _repository.GetDepartmentReportAsync(filter);

        using var workbook = new XLWorkbook();

        var sheet = workbook.Worksheets.Add("Department Report");

        sheet.Cell(1, 1).Value = "Department";
        sheet.Cell(1, 2).Value = "Spend";
        sheet.Cell(1, 3).Value = "Expenses";

        int row = 2;

        foreach (var item in data)
        {
            sheet.Cell(row, 1).Value = item.Department;
            sheet.Cell(row, 2).Value = item.Spend;
            sheet.Cell(row, 3).Value = item.Expenses;
            row++;
        }

        sheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    public async Task<List<CategoryReportDto>>
GetCategoriesAsync(
    ReportFilterDto filter)
    {
        return await _repository
            .GetCategoryReportAsync(filter);
    }

    public async Task<byte[]> ExportCategoryExcelAsync(
    ReportFilterDto filter)
    {
        var data =
            await _repository.GetCategoryReportAsync(filter);

        using var workbook =
            new XLWorkbook();

        var sheet =
            workbook.Worksheets.Add("Category Report");

        sheet.Cell(1, 1).Value = "Category";
        sheet.Cell(1, 2).Value = "Spend";
        sheet.Cell(1, 3).Value = "Expenses";

        sheet.Range(1, 1, 1, 3)
            .Style.Font.Bold = true;

        int row = 2;

        foreach (var item in data)
        {
            sheet.Cell(row, 1).Value = item.Category;
            sheet.Cell(row, 2).Value = item.Spend;
            sheet.Cell(row, 3).Value = item.Expenses;

            row++;
        }

        sheet.Columns().AdjustToContents();

        using var stream =
            new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    public async Task<List<MonthlyReportDto>>
GetMonthlyAsync(
    ReportFilterDto filter)
    {
        return await _repository
            .GetMonthlyReportAsync(filter);
    }

    public async Task<byte[]> ExportMonthlyExcelAsync(
    ReportFilterDto filter)
    {
        var data =
            await _repository.GetMonthlyReportAsync(filter);

        using var workbook = new XLWorkbook();

        var sheet =
            workbook.Worksheets.Add("Monthly Report");

        sheet.Cell(1, 1).Value = "Month";
        sheet.Cell(1, 2).Value = "Spend";
        sheet.Cell(1, 3).Value = "Contracts";
        sheet.Cell(1, 4).Value = "Vendors";

        sheet.Range(1, 1, 1, 4)
            .Style.Font.Bold = true;

        int row = 2;

        foreach (var item in data)
        {
            sheet.Cell(row, 1).Value = item.Month;
            sheet.Cell(row, 2).Value = item.Spend;
            sheet.Cell(row, 3).Value = item.Contracts;
            sheet.Cell(row, 4).Value = item.Vendors;

            row++;
        }

        sheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }


}