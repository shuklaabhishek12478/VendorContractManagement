using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;

        public AnalyticsController(
            IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        [PermissionAuthorize("Analytics.ContractTrend")]
        [HttpGet("contracts-trend")]
        public async Task<IActionResult> GetContractTrend()
        {
            return Ok(
                await _analyticsService.GetContractTrendAsync());
        }

        [PermissionAuthorize("Analytics.VendorTrend")]
        [HttpGet("vendors-trend")]
        public async Task<IActionResult> GetVendorTrend()
        {
            return Ok(
                await _analyticsService.GetVendorTrendAsync());
        }

        [PermissionAuthorize("Analytics.ContractStatus")]
        [HttpGet("contract-status")]
        public async Task<IActionResult> GetContractStatus()
        {
            return Ok(
                await _analyticsService.GetContractStatusAsync());
        }
    }
}