using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Auth;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterDto dto);
        Task<LoginResponseDto> LoginAsync(LoginDto dto);

        Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenDto dto);

        Task LogoutAsync(string refreshToken);

        Task ForgotPasswordAsync(ForgotPasswordDto dto);

        Task ResetPasswordAsync(ResetPasswordRequestDto dto);

        Task<CurrentUserDto> GetCurrentUserAsync();
    }
}