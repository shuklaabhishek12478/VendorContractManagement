using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.Interfaces;

namespace VendorContractManagement.API.Controllers;

[ApiController]
[Route("api/permission-rules")]
[Authorize]
public class PermissionRuleController : ControllerBase
{
    private readonly IPermissionRuleService _permissionRuleService;

    public PermissionRuleController(
        IPermissionRuleService permissionRuleService)
    {
        _permissionRuleService = permissionRuleService;
    }

    [HttpGet]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> Get()
    {
        var rules =
            await _permissionRuleService.GetRulesAsync();

        return Ok(rules);
    }
}