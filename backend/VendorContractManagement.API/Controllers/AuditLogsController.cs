using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [EnableRateLimiting("fixed")]
    [Authorize(Roles = "Admin,Manager")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditLogsController : ControllerBase
    {
        private readonly IAuditLogService _auditLogService;

        public AuditLogsController(IAuditLogService auditLogService)
        {
            _auditLogService = auditLogService;
        }

        // 🔥 GET ALL (simple)
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _auditLogService.GetAllAsync();
            return Ok(result);
        }

        // 🔥 FILTER + PAGINATION (MAIN FEATURE)
        [HttpGet("filtered")]
        public async Task<IActionResult> GetFiltered(
            [FromQuery] AuditLogFilterDto filter,
            int page = 1,
            int pageSize = 10)
        {
            var result = await _auditLogService.GetFilteredAsync(filter, page, pageSize);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("export")]
        public async Task<IActionResult> Export([FromQuery] AuditLogFilterDto filter)
        {
            var fileBytes = await _auditLogService.ExportToExcelAsync(filter);

            return File(
                fileBytes,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "AuditLogs.xlsx"
            );
        }
    }
}