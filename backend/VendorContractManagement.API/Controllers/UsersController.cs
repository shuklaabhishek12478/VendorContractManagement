using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(
            IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged(
    [FromQuery] UserQueryDto query)
        {
            return Ok(
                await _userService.GetPagedAsync(query));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(
                await _userService.GetAllAsync());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            CreateUserDto dto)
        {
            await _userService.CreateAsync(dto);

            return Ok("User created successfully");
        }

        [HttpPut("{id}/activate")]
        public async Task<IActionResult>
            Activate(int id)
        {
            await _userService.ActivateAsync(id);

            return Ok(new
            {
                message = "User activated successfully"
            });
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult>
            Deactivate(int id)
        {
            await _userService.DeactivateAsync(id);

            return Ok(new
            {
                message = "User deactivated successfully"
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
        int id,
        UpdateUserDto dto)
        {
            try
            {
                await _userService.UpdateAsync(id, dto);

                return Ok(new
                {
                    message = "User updated successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteAsync(id);

            return Ok("User deleted successfully");
        }

        [HttpPut("{id}/reset-password")]
        public async Task<IActionResult> ResetPassword(
    int id,
    ResetPasswordDto dto)
        {
            await _userService.ResetPasswordAsync(
                id,
                dto.NewPassword);

            return Ok("Password reset successfully");
        }

        [HttpPut("{id}/roles")]
        public async Task<IActionResult> AssignRoles(
    int id,
    [FromBody] List<int> roleIds)
        {
            await _userService.AssignRolesAsync(
                id,
                roleIds);

            return Ok("Roles assigned successfully");
        }


        [HttpGet("export")]
        public async Task<IActionResult> Export()
        {
            var file = await _userService.ExportAsync();

            return File(
                file,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Users_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
        }


        [HttpPost("import")]
        public async Task<IActionResult> Import(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File is required.");

                using var stream = file.OpenReadStream();

                await _userService.ImportAsync(stream);

                return Ok(new
                {
                    message = "Users imported successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}