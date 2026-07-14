using Microsoft.AspNetCore.Authorization;

namespace VendorContractManagement.API.Authorization
{
    public class PermissionAuthorizeAttribute : AuthorizeAttribute
    {
        public PermissionAuthorizeAttribute(string permission)
        {
            Policy = permission;
        }
    }
}