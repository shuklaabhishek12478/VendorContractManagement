using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecentActivitiesController : ControllerBase
{
    private readonly IRecentActivityService _service;

    public RecentActivitiesController(
        IRecentActivityService service)
    {
        _service = service;
    }

    [HttpGet]
    [PermissionAuthorize("Dashboard.RecentActivities")]
    public async Task<IActionResult> GetRecent(
        [FromQuery] int count = 20)
    {
        var result =
            await _service.GetRecentAsync(count);

        return Ok(result);
    }

    [HttpGet("vendor/{vendorId}")]
    [PermissionAuthorize("Dashboard.RecentActivities")]
    public async Task<IActionResult> GetVendorActivities(
        int vendorId,
        [FromQuery] int count = 20)
    {
        var result =
            await _service.GetByVendorIdAsync(
                vendorId,
                count);

        return Ok(result);
    }

    [HttpGet("contract/{contractId}")]
    [PermissionAuthorize("Dashboard.RecentActivities")]
    public async Task<IActionResult> GetContractActivities(
        int contractId,
        [FromQuery] int count = 20)
    {
        var result =
            await _service.GetContractActivitiesAsync(
                contractId,
                count);

        return Ok(result);
    }

    [HttpGet("user/{userId}")]
    [PermissionAuthorize("Dashboard.RecentActivities")]
    public async Task<IActionResult> GetUserActivities(
        int userId,
        [FromQuery] int count = 20)
    {
        var result =
            await _service.GetUserActivitiesAsync(
                userId,
                count);

        return Ok(result);
    }
}