using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Auth;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [EnableRateLimiting("fixed")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            await _authService.RegisterAsync(dto);

            return Ok(new
            {
                message = "User registered successfully"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var result =
                await _authService.LoginAsync(dto);

            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(RefreshTokenDto dto)
        {
            var result =
                await _authService.RefreshTokenAsync(dto);

            return Ok(result);
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutDto dto)
        {
            await _authService.LogoutAsync(
                dto.RefreshToken);

            return Ok(new
            {
                Message = "Logged out successfully"
            });
        }

        [HttpPost("forgot-password")]
        
        public async Task<IActionResult> ForgotPassword(
    ForgotPasswordDto dto)
        {
            await _authService.ForgotPasswordAsync(dto);

            return Ok(new
            {
                message = "If an account with that email exists, a password reset link has been sent."
            });
        }

        [HttpPost("reset-password")]
     
        public async Task<IActionResult> ResetPassword(
    ResetPasswordRequestDto dto)
        {
            await _authService.ResetPasswordAsync(dto);

            return Ok(new
            {
                message = "Password reset successfully."
            });
        }
    }
}