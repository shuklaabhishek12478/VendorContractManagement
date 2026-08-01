using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

[Authorize]
[ApiController]
[Route("api/user-approval")]
public class UserApprovalController
    : ControllerBase
{
    private readonly IUserApprovalService _service;

    public UserApprovalController(
        IUserApprovalService service)
    {
        _service = service;
    }

    [HttpGet("pending")]
    [PermissionAuthorize("UserApproval.View")]
    public async Task<IActionResult> Pending()
    {
        return Ok(
            await _service.GetPendingUsersAsync());
    }

    [HttpGet("{id}")]
    [PermissionAuthorize("UserApproval.View")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _service.GetByIdAsync(id);

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    [HttpPost("{id}/approve")]
    [PermissionAuthorize("UserApproval.Approve")]
    public async Task<IActionResult> Approve(
        int id,
        ApproveUserDto dto)
    {
        var adminId =
            int.Parse(User.FindFirst(
                ClaimTypes.NameIdentifier)!.Value);

        await _service.ApproveUserAsync(
            id,
            dto.RoleId,
            adminId);

        return Ok();
    }

    [HttpPost("{id}/reject")]
    [PermissionAuthorize("UserApproval.Reject")]
    public async Task<IActionResult> Reject(
    int id,
    RejectUserDto dto)
    {
        var adminId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        await _service.RejectUserAsync(
            id,
            dto.Reason,
            adminId);

        return Ok(new
        {
            message = "User rejected successfully."
        });
    }
}