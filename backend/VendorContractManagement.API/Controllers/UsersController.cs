using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs;
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(
                await _userService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(
                await _userService.GetByIdAsync(id));
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

            return Ok("User activated");
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult>
            Deactivate(int id)
        {
            await _userService.DeactivateAsync(id);

            return Ok("User deactivated");
        }
    }
}