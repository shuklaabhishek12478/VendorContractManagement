using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        private readonly IPermissionRuleService _permissionRuleService;
        public PermissionController(
            IPermissionService permissionService,
            IPermissionRuleService permissionRuleService)
        {
            _permissionService = permissionService;
            _permissionRuleService = permissionRuleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var permissions =
                await _permissionService.GetAllAsync();

            return Ok(permissions);
        }

        [HttpGet("{id:int}")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetById(int id)
        {
            var permission =
                await _permissionService.GetByIdAsync(id);

            if (permission == null)
                return NotFound();

            return Ok(permission);
        }

        [HttpGet("modules")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetModules()
        {
            var modules =
                await _permissionService.GetModulesAsync();

            return Ok(modules);
        }

        [HttpGet("module/{module}")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetByModule(string module)
        {
            var permissions =
                await _permissionService.GetByModuleAsync(module);

            return Ok(permissions);
        }

        [HttpGet("grouped")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetGrouped()
        {
            var result =
                await _permissionService.GetGroupedAsync();

            return Ok(result);
        }

        [HttpPost("by-ids")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetByIds(
    List<int> permissionIds)
        {
            var result =
                await _permissionService.GetByIdsAsync(permissionIds);

            return Ok(result);
        }

        [HttpGet("rules")]
        [PermissionAuthorize("Role.View")]
        public async Task<IActionResult> GetRules()
        {
            var result =
                await _permissionRuleService.GetRulesAsync();

            return Ok(result);
        }
    }
}