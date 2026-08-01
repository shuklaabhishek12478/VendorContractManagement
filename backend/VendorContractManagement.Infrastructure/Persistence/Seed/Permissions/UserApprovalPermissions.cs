using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class UserApprovalPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new()
            {
                Name = "View Pending User Approvals",
                Code = "UserApproval.View",
                Module = "UserApproval",
                Description = "View pending user approvals"
            },

            new()
            {
                Name = "Approve User Registration",
                Code = "UserApproval.Approve",
                Module = "UserApproval",
                Description = "Approve user registration"
            },

            new()
            {
                Name = "Reject User Registration",
                Code = "UserApproval.Reject",
                Module = "UserApproval",
                Description = "Reject user registration"
            }
        };
    }
}