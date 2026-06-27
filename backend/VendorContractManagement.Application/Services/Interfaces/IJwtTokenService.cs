using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);

        string GenerateRefreshToken();
    }
}