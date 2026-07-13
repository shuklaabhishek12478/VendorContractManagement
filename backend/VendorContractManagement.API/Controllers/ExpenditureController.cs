using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.Services.Interfaces;

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
    public async Task<IActionResult> GetAll()
    {
        var result =
            await _service.GetAllAsync();

        return Ok(result);
    }


    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(
    int id)
    {
        var result =
            await _service.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }


    [HttpPost]
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
    public async Task<IActionResult> Update(
    int id,
    UpdateExpenditureDto dto)
    {
        var result =
            await _service.UpdateAsync(
                id,
                dto);

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(
    int id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }


    [HttpGet("search")]
    public async Task<IActionResult> Search(
    [FromQuery] ExpenditureFilterDto filter)
    {
        var result =
            await _service.SearchAsync(filter);

        return Ok(result);
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var result =
            await _service.GetDashboardAsync();

        return Ok(result);
    }


    [HttpGet("forecast/{year:int}")]
    public async Task<IActionResult> GetForecast(
    int year)
    {
        var result =
            await _service.GetForecastAsync(year);

        return Ok(result);
    }
}