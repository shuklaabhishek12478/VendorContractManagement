using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using VendorContractManagement.Application.Interfaces;

namespace VendorContractManagement.API.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int? UserId
        {
            get
            {
                var value = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

                if (int.TryParse(value, out var id))
                    return id;

                return null;
            }
        }
        public string? Email =>
            _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.Email)?
                .Value;

        public string? Role =>
            _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.Role)?
                .Value;

        public int? VendorId
        {
            get
            {
                var value =
                    _httpContextAccessor.HttpContext?
                        .User?
                        .FindFirst("VendorId")?
                        .Value;

                return int.TryParse(value, out var vendorId)
                    ? vendorId
                    : null;
            }
        }


    }
}