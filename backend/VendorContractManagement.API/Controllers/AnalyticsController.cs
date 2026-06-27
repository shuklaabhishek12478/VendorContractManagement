using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize(Roles = "Admin,Manager,Viewer")]
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;

        public AnalyticsController(
            IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        [HttpGet("contracts-trend")]
        public async Task<IActionResult> GetContractTrend()
        {
            return Ok(await _analyticsService.GetContractTrendAsync());
        }

        [Authorize(Roles = "Vendor")]
        [HttpGet("vendors-trend")]
        public async Task<IActionResult> GetVendorTrend()
        {
            return Ok(await _analyticsService.GetVendorTrendAsync());
        }

        [HttpGet("contract-status")]
        public async Task<IActionResult> GetContractStatus()
        {
            return Ok(await _analyticsService.GetContractStatusAsync());
        }
    }
}