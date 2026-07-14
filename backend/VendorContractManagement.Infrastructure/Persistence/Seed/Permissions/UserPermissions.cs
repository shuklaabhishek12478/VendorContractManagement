using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class UserPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new()
            {
                Name = "View Users",
                Code = "User.View",
                Module = "User",
                Description = "View users"
            },

            new()
            {
                Name = "View User Details",
                Code = "User.ViewDetails",
                Module = "User",
                Description = "View user details"
            },

            new()
            {
                Name = "Create User",
                Code = "User.Create",
                Module = "User",
                Description = "Create user"
            },

            new()
            {
                Name = "Edit User",
                Code = "User.Edit",
                Module = "User",
                Description = "Edit user"
            },

            new()
            {
                Name = "Delete User",
                Code = "User.Delete",
                Module = "User",
                Description = "Delete user"
            },

            new()
            {
                Name = "Activate User",
                Code = "User.Activate",
                Module = "User",
                Description = "Activate user"
            },

            new()
            {
                Name = "Deactivate User",
                Code = "User.Deactivate",
                Module = "User",
                Description = "Deactivate user"
            },

            new()
            {
                Name = "Lock User",
                Code = "User.Lock",
                Module = "User",
                Description = "Lock user account"
            },

            new()
            {
                Name = "Unlock User",
                Code = "User.Unlock",
                Module = "User",
                Description = "Unlock user account"
            },

            new()
            {
                Name = "Reset Password",
                Code = "User.ResetPassword",
                Module = "User",
                Description = "Reset user password"
            },

            new()
            {
                Name = "Change Password",
                Code = "User.ChangePassword",
                Module = "User",
                Description = "Change password"
            },

            new()
            {
                Name = "Assign Role",
                Code = "User.AssignRole",
                Module = "User",
                Description = "Assign roles to user"
            },

            new()
            {
                Name = "Remove Role",
                Code = "User.RemoveRole",
                Module = "User",
                Description = "Remove user role"
            },

            new()
            {
                Name = "View Login History",
                Code = "User.LoginHistory",
                Module = "User",
                Description = "View login history"
            },

            new()
            {
                Name = "View Profile",
                Code = "User.Profile",
                Module = "User",
                Description = "View own profile"
            },

            new()
            {
                Name = "Export Users",
                Code = "User.Export",
                Module = "User",
                Description = "Export users"
            }
        };
    }
}