using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class RolePermissions
{
    public static List<Permission> Get()
    {
        return new List<Permission>
        {
            new()
            {
                Module = "Role",
                Name = "View Roles",
                Code = "Role.View"
            },

            new()
            {
                Module = "Role",
                Name = "View Role Details",
                Code = "Role.ViewDetails"
            },

            new()
            {
                Module = "Role",
                Name = "Create Role",
                Code = "Role.Create"
            },

            new()
            {
                Module = "Role",
                Name = "Edit Role",
                Code = "Role.Edit"
            },

            new()
            {
                Module = "Role",
                Name = "Delete Role",
                Code = "Role.Delete"
            },

            new()
            {
                Module = "Role",
                Name = "Assign Permissions",
                Code = "Role.AssignPermissions"
            },

            new()
            {
                Module = "Role",
                Name = "Assign Users",
                Code = "Role.AssignUsers"
            }
        };
    }
}