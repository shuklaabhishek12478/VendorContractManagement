using BCrypt.Net;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _jwtTokenService = jwtTokenService;
        }

        public async Task RegisterAsync(RegisterDto dto)
        {
            var existingUser =
                await _userRepository.GetByEmailAsync(dto.Email);

            if (existingUser != null)
                throw new Exception("User already exists");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,

                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(dto.Password),

                UserRoles = new List<UserRole>(),

                VendorId = dto.VendorId
            };

            await _userRepository.AddAsync(user);

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto dto)
        {
            var user =
                await _userRepository.GetByEmailAsync(dto.Email);

            if (user == null)
                throw new Exception("Invalid email or password");

            if (!user.IsActive)
            {
                throw new Exception(
                    "User account is disabled");
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash);

            if (!isPasswordValid)
                throw new Exception("Invalid email or password");

            var accessToken =
                _jwtTokenService.GenerateToken(user);

            var refreshToken =
                _jwtTokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            user.RefreshTokenExpiryTime =
                DateTime.UtcNow.AddDays(7);

            await _unitOfWork.SaveChangesAsync();

            return new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenDto dto)
        {
            var user =
                await _userRepository.GetByRefreshTokenAsync(
                    dto.RefreshToken);

            if (user == null)
                throw new Exception("Invalid refresh token");

            if (user.RefreshTokenExpiryTime < DateTime.UtcNow)
                throw new Exception("Refresh token expired");

            var newAccessToken =
                _jwtTokenService.GenerateToken(user);

            var newRefreshToken =
                _jwtTokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;

            user.RefreshTokenExpiryTime =
                DateTime.UtcNow.AddDays(7);

            await _unitOfWork.SaveChangesAsync();

            return new LoginResponseDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var user =
                await _userRepository
                    .GetByRefreshTokenAsync(refreshToken);

            if (user == null)
                throw new Exception("Invalid refresh token");

            user.RefreshToken = null;

            user.RefreshTokenExpiryTime = null;

            await _unitOfWork.SaveChangesAsync();
        }
    }
}