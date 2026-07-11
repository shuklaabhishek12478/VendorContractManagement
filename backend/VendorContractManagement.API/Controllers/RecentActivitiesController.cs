using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecentActivitiesController : ControllerBase
    {
        private readonly IRecentActivityService _service;

        public RecentActivitiesController(IRecentActivityService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecent([FromQuery] int count = 20)
        {
            var result = await _service.GetRecentAsync(count);
            return Ok(result);
        }

        [HttpGet("vendor/{vendorId}")]
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
    }
}
