using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.Services.Interfaces;
using ClosedXML.Excel;

namespace VendorContractManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ExpenditureController : ControllerBase
{
    private readonly IExpenditureService _service;

    public ExpenditureController(
        IExpenditureService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Policy = "Expenditure.View")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();

        return Ok(result);
    }


    [HttpGet("{id:int}")]
    [Authorize(Policy = "Expenditure.View")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);

        return Ok(result);
    }


    [HttpPost]
    [Authorize(Policy = "Expenditure.Create")]
    public async Task<IActionResult> Create(
    CreateExpenditureDto dto)
    {
        var result =
            await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Id },
            result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Policy = "Expenditure.Update")]
    public async Task<IActionResult> Update(
    int id,
    UpdateExpenditureDto dto)
    {
        var result =
            await _service.UpdateAsync(id, dto);

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Policy = "Expenditure.Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }


    [HttpGet("search")]
    [Authorize(Policy = "Expenditure.Search")]
    public async Task<IActionResult> Search(
     [FromQuery] ExpenditureFilterDto filter)
    {
        var result =
            await _service.SearchAsync(filter);

        return Ok(result);
    }

    [HttpGet("dashboard")]
    [Authorize(Policy = "Expenditure.Dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var result =
            await _service.GetDashboardAsync();

        return Ok(result);
    }


    [HttpGet("forecast/{year:int}")]
    [Authorize(Policy = "Expenditure.Forecast")]
    public async Task<IActionResult> GetForecast(int year)
    {
        var result =
            await _service.GetForecastAsync(year);

        return Ok(result);
    }



    [HttpGet("export/excel")]
    [Authorize(Policy = "Expenditure.Export")]
    public async Task<IActionResult> ExportExcel(
    [FromQuery] ExpenditureFilterDto filter)
    {
        var file =
            await _service.ExportToExcelAsync(filter);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"ExpenditureReport_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
    }

    [HttpGet("forecast/details/{year:int}")]
    [Authorize(Policy = "Expenditure.Forecast")]
    public async Task<IActionResult> GetExpenditureForecast(int year)
    {
        var result =
            await _service.GetExpenditureForecastInnerAsync(year);

        return Ok(result);
    }


}