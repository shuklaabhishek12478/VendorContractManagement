using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Security.Cryptography;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Auth;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IJwtTokenService jwtTokenService,
             IEmailService emailService,
             IConfiguration configuration,
             IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _jwtTokenService = jwtTokenService;
            _emailService = emailService;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
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

                VendorId = dto.VendorId,
                IsActive = true,
                CreatedOn = DateTime.UtcNow,
                ApprovalStatus = ApprovalStatus.Pending,
                ApprovedBy = null,
                ApprovedOn = null,
                RejectionReason = null,
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
            if (user.ApprovalStatus == ApprovalStatus.Pending)
            {
                throw new Exception(
                    "Your account is awaiting administrator approval.");
            }

            if (user.ApprovalStatus == ApprovalStatus.Rejected)
            {
                throw new Exception(
                    string.IsNullOrWhiteSpace(user.RejectionReason)
                        ? "Your registration request has been rejected."
                        : $"Registration rejected: {user.RejectionReason}");
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

        private static string GenerateResetToken()
        {
            var bytes = RandomNumberGenerator.GetBytes(32);

            return Convert.ToHexString(bytes);
        }

        public async Task ForgotPasswordAsync(
    ForgotPasswordDto dto)
        {
            var user =
                await _userRepository.GetByEmailAsync(dto.Email);

            // Security:
            // Email exist karta hai ya nahi,
            // kabhi reveal nahi karna.

            if (user == null)
                return;

            var token = GenerateResetToken();

            user.PasswordResetToken = token;

            user.PasswordResetTokenExpiry =
                DateTime.UtcNow.AddMinutes(30);

            await _unitOfWork.SaveChangesAsync();

            var frontend =
    _configuration["AppSettings:FrontendUrl"]
    ?? "http://localhost:4200";

            var resetUrl =
                $"{frontend}/forgot-password-reset?token={token}";

            var body = $@"
<html>

<body style='font-family:Segoe UI'>

<h2>Password Reset</h2>

<p>Hello {user.FullName},</p>

<p>
We received a request to reset your password.
</p>

<p>

<a href='{resetUrl}'
style='background:#1976d2;
padding:12px 20px;
color:white;
text-decoration:none;
border-radius:5px;'>

Reset Password

</a>

</p>

<p>

This link will expire in
30 minutes.

</p>

<p>

If you did not request this,
please ignore this email.

</p>

</body>

</html>";

            await _emailService.SendEmailAsync(

                user.Email,

                "Vendor Contract Management - Password Reset",

                body);
        }

        public async Task ResetPasswordAsync(
    ResetPasswordRequestDto dto)
        {
            var user =
                await _userRepository
                    .GetByPasswordResetTokenAsync(dto.Token);

            if (user == null)
                throw new Exception("Invalid reset token.");

            if (user.PasswordResetTokenExpiry == null ||
                user.PasswordResetTokenExpiry < DateTime.UtcNow)
            {
                throw new Exception("Reset link has expired.");
            }

            user.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // One-time use token
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;

            // Logout from all devices
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<CurrentUserDto> GetCurrentUserAsync()
        {
            var userIdClaim = _httpContextAccessor
                .HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            if (string.IsNullOrWhiteSpace(userIdClaim))
                throw new Exception("User not authenticated.");

            var user = await _userRepository.GetByIdAsync(
                int.Parse(userIdClaim));

            if (user == null)
                throw new Exception("User not found.");

            return new CurrentUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                VendorId = user.VendorId,
                Role = user.UserRoles
                            .Select(x => x.Role.Name)
                            .FirstOrDefault() ?? string.Empty
            };
        }
    }
}