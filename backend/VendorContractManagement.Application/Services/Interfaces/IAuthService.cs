using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterDto dto);
        Task<LoginResponseDto> LoginAsync(LoginDto dto);

        Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenDto dto);

        Task LogoutAsync(string refreshToken);
    }
}