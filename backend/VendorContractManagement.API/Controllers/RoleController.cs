using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Implementations;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;
    private readonly IPermissionExportService _permissionExportService;
    private readonly IPermissionImportService _permissionImportService;

    public RoleController(IRoleService roleService,
        IPermissionExportService permissionExportService,
        IPermissionImportService permissionImportService)
    {
        _roleService = roleService;
        _permissionExportService = permissionExportService;
        _permissionImportService = permissionImportService;
    }

    
    [HttpGet]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetAll()
    {
        var roles = await _roleService.GetAllAsync();
        return Ok(roles);
    }

    [HttpGet("{id:int}")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetById(int id)
    {
        var role = await _roleService.GetByIdAsync(id);

        if (role == null)
            return NotFound();

        return Ok(role);
    }

    [HttpPost]
    [PermissionAuthorize("Role.Create")]
    public async Task<IActionResult> Create(CreateRoleDto dto)
    {
        var result = await _roleService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Id },
            result);
    }

    [HttpPut("{id:int}")]
    [PermissionAuthorize("Role.Edit")]
    public async Task<IActionResult> Update(
        int id,
        UpdateRoleDto dto)
    {
        var result = await _roleService.UpdateAsync(id, dto);

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [PermissionAuthorize("Role.Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        await _roleService.DeleteAsync(id);

        return Ok(new
        {
            Message = "Role deleted successfully."
        });
    }

    
    [HttpPut("{id:int}/activate")]
    [PermissionAuthorize("Role.Edit")]
    public async Task<IActionResult> Activate(int id)
    {
        await _roleService.ActivateAsync(id);

        return Ok(new
        {
            Message = "Role activated successfully."
        });
    }

    [HttpPut("{id:int}/deactivate")]
    [PermissionAuthorize("Role.Edit")]
    public async Task<IActionResult> Deactivate(int id)
    {
        await _roleService.DeactivateAsync(id);

        return Ok(new
        {
            Message = "Role deactivated successfully."
        });
    }

 
    [HttpPost("search")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> Search(RoleFilterDto filter)
    {
        var result = await _roleService.SearchAsync(filter);

        return Ok(result);
    }

    
    [HttpPost("{id:int}/assign-permissions")]
    [PermissionAuthorize("Role.AssignPermissions")]
    public async Task<IActionResult> AssignPermissions(
        int id,
        AssignPermissionsDto dto)
    {
        await _roleService.AssignPermissionsAsync(id, dto);

        return Ok(new
        {
            Message = "Permissions assigned successfully."
        });
    }

    [HttpGet("{id:int}/permissions")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetPermissions(int id)
    {
        var permissions =
            await _roleService.GetPermissionsAsync(id);

        return Ok(permissions);
    }

  
    [HttpPost("{id:int}/clone")]
    [PermissionAuthorize("Role.Create")]
    public async Task<IActionResult> Clone(
        int id,
        [FromQuery] string newRoleName)
    {
        var role =
            await _roleService.CloneAsync(id, newRoleName);

        return Ok(role);
    }

  
    [HttpPost("{id:int}/assign-users")]
    [PermissionAuthorize("Role.AssignUsers")]
    public async Task<IActionResult> AssignUsers(
        int id,
        AssignUsersToRoleDto dto)
    {
        await _roleService.AssignUsersAsync(id, dto);

        return Ok(new
        {
            Message = "Users assigned successfully."
        });
    }

    [HttpGet("{id:int}/users")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetUsers(int id)
    {
        var users =
            await _roleService.GetUsersAsync(id);

        return Ok(users);
    }

    [HttpDelete("{roleId:int}/users/{userId:int}")]
    [PermissionAuthorize("Role.AssignUsers")]
    public async Task<IActionResult> RemoveUser(
        int roleId,
        int userId)
    {
        await _roleService.RemoveUserAsync(
            roleId,
            userId);

        return Ok(new
        {
            Message = "User removed from role successfully."
        });
    }


    [HttpGet("statistics")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetStatistics()
    {
        var statistics =
            await _roleService.GetStatisticsAsync();

        return Ok(statistics);
    }

    [HttpGet("active")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> GetActiveRoles()
    {
        var result = await _roleService.GetActiveRolesAsync();

        return Ok(result);
    }

    [HttpGet("lookup")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> Lookup()
    {
        var result = await _roleService.GetLookupAsync();

        return Ok(result);
    }

    [HttpGet("exists")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> Exists(
    [FromQuery] string roleName,
    [FromQuery] int? excludeId)
    {
        var exists = await _roleService.ExistsAsync(
            roleName,
            excludeId);

        return Ok(new
        {
            exists
        });
    }


    [HttpGet("{id:int}/permission-matrix")]
    [PermissionAuthorize("Role.AssignPermissions")]
    public async Task<IActionResult> GetPermissionMatrix(
    int id)
    {
        var result =
            await _roleService
                .GetPermissionMatrixAsync(id);

        return Ok(result);
    }

    [HttpPut("{id:int}/permission-matrix")]
    [PermissionAuthorize("Role.AssignPermissions")]
    public async Task<IActionResult> SavePermissionMatrix(
        int id,
        UpdatePermissionMatrixDto dto)
    {
        await _roleService
            .SavePermissionMatrixAsync(id, dto);

        return Ok(new
        {
            Message = "Permission matrix updated successfully."
        });
    }

    [HttpGet("{id:int}/permissions/export")]
    [PermissionAuthorize("Role.View")]
    public async Task<IActionResult> ExportPermissions(int id)
    {
        var file =
            await _permissionExportService
                .ExportRolePermissionsAsync(id);

        return File(
            file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"Role_{id}_Permissions.xlsx");
    }

    [HttpGet("{id}/permissions/export/csv")]
    public async Task<IActionResult> ExportCsv(int id)
    {
        var file = await _permissionExportService
            .ExportCsvAsync(id);

        return File(

            file,

            "text/csv",

            $"Role_{id}_Permissions.csv");
    }

    [HttpGet("{id}/permissions/export/json")]
    public async Task<IActionResult> ExportJson(int id)
    {
        var file = await _permissionExportService
            .ExportJsonAsync(id);

        return File(

            file,

            "application/json",

            $"Role_{id}_Permissions.json");
    }

    [HttpPost("{id}/permissions/import")]
    [PermissionAuthorize("Role.Edit")]
    public async Task<IActionResult> ImportPermissions(
    int id,
    IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is required.");
        }

        var result =
    await _permissionImportService
        .ImportAsync(id, file);

        return Ok(result);
    }
}