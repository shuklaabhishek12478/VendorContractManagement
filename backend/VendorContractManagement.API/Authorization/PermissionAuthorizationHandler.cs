using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Authorization
{
    public class PermissionAuthorizationHandler
        : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IPermissionService _permissionService;

        public PermissionAuthorizationHandler(
            IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        protected override async Task HandleRequirementAsync(
    AuthorizationHandlerContext context,
    PermissionRequirement requirement)
        {
            var userIdClaim =
                context.User.FindFirst(ClaimTypes.NameIdentifier);

            Console.WriteLine($"User Claim = {userIdClaim?.Value}");
            Console.WriteLine($"Permission = {requirement.Permission}");

            if (userIdClaim == null)
                return;

            var userId = int.Parse(userIdClaim.Value);

            var hasPermission =
                await _permissionService.HasPermissionAsync(
                    userId,
                    requirement.Permission);

            Console.WriteLine($"Has Permission = {hasPermission}");

            if (hasPermission)
            {
                context.Succeed(requirement);
            }
        }
    }
}