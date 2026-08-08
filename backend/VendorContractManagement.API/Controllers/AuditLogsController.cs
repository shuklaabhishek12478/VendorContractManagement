using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize]
    [EnableRateLimiting("fixed")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuditLogsController : ControllerBase
    {
        private readonly IAuditLogService _auditLogService;

        public AuditLogsController(
            IAuditLogService auditLogService)
        {
            _auditLogService = auditLogService;
        }

        [PermissionAuthorize("AuditLog.View")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var result =
                await _auditLogService.GetAllAsync();

            return Ok(result);
        }

        [PermissionAuthorize("AuditLog.View")]
        [HttpGet("filtered")]
        public async Task<IActionResult> GetFiltered(
            [FromQuery] AuditLogFilterDto filter,
            int page = 1,
            int pageSize = 10)
        {
            var result =
                await _auditLogService.GetFilteredAsync(
                    filter,
                    page,
                    pageSize);

            return Ok(result);
        }

        [PermissionAuthorize("AuditLog.Export")]
        [HttpGet("export")]
        public async Task<IActionResult> Export(
            [FromQuery] AuditLogFilterDto filter)
        {
            var fileBytes =
                await _auditLogService
                    .ExportToExcelAsync(filter);

            return File(
                fileBytes,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "AuditLogs.xlsx"
            );
        }
    }
}