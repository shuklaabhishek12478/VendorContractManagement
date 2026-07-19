using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class PermissionDependencySeeder
{
    public static List<PermissionDependency> Get()
    {
        return new List<PermissionDependency>
        {
            // ==========================
            // Vendor
            // ==========================

            new()
            {
                PermissionCode = "Vendor.Create",
                DependsOnPermissionCode = "Vendor.View"
            },

            new()
            {
                PermissionCode = "Vendor.Edit",
                DependsOnPermissionCode = "Vendor.View"
            },

            new()
            {
                PermissionCode = "Vendor.Delete",
                DependsOnPermissionCode = "Vendor.View"
            },

            new()
            {
                PermissionCode = "Vendor.Delete",
                DependsOnPermissionCode = "Vendor.Edit"
            },

            // ==========================
            // Contract
            // ==========================

            new()
            {
                PermissionCode = "Contract.Create",
                DependsOnPermissionCode = "Contract.View"
            },

            new()
            {
                PermissionCode = "Contract.Edit",
                DependsOnPermissionCode = "Contract.View"
            },

            new()
            {
                PermissionCode = "Contract.Delete",
                DependsOnPermissionCode = "Contract.View"
            },

            new()
            {
                PermissionCode = "Contract.Delete",
                DependsOnPermissionCode = "Contract.Edit"
            },

            new()
            {
                PermissionCode = "Contract.Approve",
                DependsOnPermissionCode = "Contract.View"
            },

            // ==========================
            // User
            // ==========================

            new()
            {
                PermissionCode = "User.Create",
                DependsOnPermissionCode = "User.View"
            },

            new()
            {
                PermissionCode = "User.Edit",
                DependsOnPermissionCode = "User.View"
            },

            new()
            {
                PermissionCode = "User.Delete",
                DependsOnPermissionCode = "User.View"
            },

            new()
            {
                PermissionCode = "User.Delete",
                DependsOnPermissionCode = "User.Edit"
            },

            // ==========================
            // Role
            // ==========================

            new()
            {
                PermissionCode = "Role.Create",
                DependsOnPermissionCode = "Role.View"
            },

            new()
            {
                PermissionCode = "Role.Edit",
                DependsOnPermissionCode = "Role.View"
            },

            new()
            {
                PermissionCode = "Role.Delete",
                DependsOnPermissionCode = "Role.View"
            },

            new()
            {
                PermissionCode = "Role.Delete",
                DependsOnPermissionCode = "Role.Edit"
            }
        };
    }
}