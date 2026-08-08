using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs.Reports;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly IReportService _service;

    public ReportController(IReportService service)
    {
        _service = service;
    }

   
    [HttpGet("dashboard")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Dashboard(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetDashboardAsync(filter);

        return Ok(result);
    }

    [HttpGet("contracts")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Contracts(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetContractsAsync(filter);

        return Ok(result);
    }

    [HttpGet("expenditures")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Expenditures(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetExpendituresAsync(filter);

        return Ok(result);
    }

    [HttpGet("vendors")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Vendors(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetVendorsAsync(filter);

        return Ok(result);
    }

    [HttpGet("departments")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Departments(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetDepartmentsAsync(filter);

        return Ok(result);
    }

    [HttpGet("categories")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Categories(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetCategoriesAsync(filter);

        return Ok(result);
    }

    [HttpGet("monthly")]
    [PermissionAuthorize("Report.View")]
    public async Task<IActionResult> Monthly(
        [FromQuery] ReportFilterDto filter)
    {
        var result =
            await _service.GetMonthlyAsync(filter);

        return Ok(result);
    }


   
    [HttpGet("export/contracts/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportContracts(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportContractExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"Contracts_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("export/expenditures/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportExpenditures(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportExpenditureExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"Expenditures_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("export/vendors/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportVendors(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportVendorExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"VendorReport_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("export/departments/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportDepartments(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportDepartmentExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"DepartmentReport_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("export/categories/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportCategories(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportCategoryExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"CategoryReport_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("export/monthly/excel")]
    [PermissionAuthorize("Report.Export")]
    public async Task<IActionResult> ExportMonthly(
        [FromQuery] ReportFilterDto filter)
    {
        var file =
            await _service.ExportMonthlyExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"MonthlyReport_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }
}