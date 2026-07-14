using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace VendorContractManagement.API.Authorization
{
    public class PermissionPolicyProvider
        : DefaultAuthorizationPolicyProvider
    {
        public PermissionPolicyProvider(
            IOptions<AuthorizationOptions> options)
            : base(options)
        {
        }

        public override async Task<AuthorizationPolicy?> GetPolicyAsync(
            string policyName)
        {
            var existingPolicy =
                await base.GetPolicyAsync(policyName);

            if (existingPolicy != null)
                return existingPolicy;

            return new AuthorizationPolicyBuilder()
                .AddRequirements(
                    new PermissionRequirement(policyName))
                .Build();
        }
    }
}