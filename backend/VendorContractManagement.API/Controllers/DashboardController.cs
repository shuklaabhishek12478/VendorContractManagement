using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _dashboardService.GetDashboardAsync();
            return Ok(result);
        }

        [Authorize(Roles = "Vendor")]
        [HttpGet("vendor")]
        public async Task<IActionResult>VendorDashboard()
        {
            var data =
                await _dashboardService
                    .GetVendorDashboardAsync();

            return Ok(data);
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            return Ok(
                await _dashboardService
                    .GetAnalyticsAsync());
        }


        [HttpGet("top-vendors")]
        public async Task<IActionResult>GetTopVendors(int count = 5)
        {
            return Ok(
                await _dashboardService
                    .GetTopVendorsAsync(count));
        }


        [HttpGet("status-distribution")]
        public async Task<IActionResult>GetStatusDistribution()
        {
            return Ok(
                await _dashboardService
                    .GetStatusDistributionAsync());
        }


        [HttpGet("monthly-trend")]
        public async Task<IActionResult>GetMonthlyTrend()
        {
            return Ok(
                await _dashboardService
                    .GetMonthlyContractTrendAsync());
        }



        [HttpGet("contract-value-trend")]
        public async Task<IActionResult>GetContractValueTrend()
        {
            return Ok(
                await _dashboardService
                    .GetContractValueTrendAsync());
        }


        [HttpGet("expiry-analytics")]
        public async Task<IActionResult>GetExpiryAnalytics()
        {
            return Ok(
                await _dashboardService
                    .GetExpiryAnalyticsAsync());
        }


        [HttpGet("charts")]
        public async Task<IActionResult>GetCharts()
        {
            return Ok(
                await _dashboardService
                    .GetChartsAsync());
        }


        [HttpGet("notifications")]
        public async Task<IActionResult>GetNotifications()
        {
            return Ok(
                await _dashboardService
                    .GetNotificationsAsync());
        }


        [HttpGet("recent-activities")]
        public async Task<IActionResult>GetRecentActivities()
        {
            return Ok(
                await _dashboardService
                    .GetRecentActivitiesAsync());
        }
    }
}