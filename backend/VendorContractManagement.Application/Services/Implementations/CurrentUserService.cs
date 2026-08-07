using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using VendorContractManagement.Application.Interfaces;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int UserId
    {
        get
        {
            var id = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            return string.IsNullOrEmpty(id)
                ? 0
                : int.Parse(id);
        }
    }

    public string UserName =>
        _httpContextAccessor.HttpContext?
        .User?
        .Identity?
        .Name ?? "";
}