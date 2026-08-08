using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(
            IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [PermissionAuthorize("Dashboard.View")]
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var result =
                await _dashboardService.GetDashboardAsync();

            return Ok(result);
        }

        [PermissionAuthorize("Dashboard.Vendor")]
        [HttpGet("vendor")]
        public async Task<IActionResult> VendorDashboard()
        {
            var data =
                await _dashboardService
                    .GetVendorDashboardAsync();

            return Ok(data);
        }

        [PermissionAuthorize("Dashboard.Analytics")]
        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            return Ok(
                await _dashboardService
                    .GetAnalyticsAsync());
        }

        [PermissionAuthorize("Dashboard.TopVendors")]
        [HttpGet("top-vendors")]
        public async Task<IActionResult> GetTopVendors(
            int count = 5)
        {
            return Ok(
                await _dashboardService
                    .GetTopVendorsAsync(count));
        }

        [PermissionAuthorize("Dashboard.StatusDistribution")]
        [HttpGet("status-distribution")]
        public async Task<IActionResult> GetStatusDistribution()
        {
            return Ok(
                await _dashboardService
                    .GetStatusDistributionAsync());
        }

        [PermissionAuthorize("Dashboard.MonthlyTrend")]
        [HttpGet("monthly-trend")]
        public async Task<IActionResult> GetMonthlyTrend()
        {
            return Ok(
                await _dashboardService
                    .GetMonthlyContractTrendAsync());
        }

        [PermissionAuthorize("Dashboard.ContractValueTrend")]
        [HttpGet("contract-value-trend")]
        public async Task<IActionResult> GetContractValueTrend()
        {
            return Ok(
                await _dashboardService
                    .GetContractValueTrendAsync());
        }

        [PermissionAuthorize("Dashboard.ExpiryAnalytics")]
        [HttpGet("expiry-analytics")]
        public async Task<IActionResult> GetExpiryAnalytics()
        {
            return Ok(
                await _dashboardService
                    .GetExpiryAnalyticsAsync());
        }

        [PermissionAuthorize("Dashboard.Charts")]
        [HttpGet("charts")]
        public async Task<IActionResult> GetCharts()
        {
            return Ok(
                await _dashboardService
                    .GetChartsAsync());
        }

        [PermissionAuthorize("Dashboard.Notifications")]
        [HttpGet("notifications")]
        public async Task<IActionResult> GetNotifications()
        {
            return Ok(
                await _dashboardService
                    .GetNotificationsAsync());
        }

        [PermissionAuthorize("Dashboard.RecentActivities")]
        [HttpGet("recent-activities")]
        public async Task<IActionResult> GetRecentActivities()
        {
            return Ok(
                await _dashboardService
                    .GetRecentActivitiesAsync());
        }
    }
}