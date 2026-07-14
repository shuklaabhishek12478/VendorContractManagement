using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class RoleSeeder
{
    public static List<Role> GetRoles()
    {
        return new()
        {
            new()
            {
                Name = "Super Admin",
                Description = "Complete system access",
                Color = "#DC2626",
                Icon = "shield",
                Priority = 1,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Admin",
                Description = "Administrative access",
                Color = "#2563EB",
                Icon = "admin_panel_settings",
                Priority = 2,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Procurement Manager",
                Description = "Vendor & Contract management",
                Color = "#7C3AED",
                Icon = "business_center",
                Priority = 3,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Finance Manager",
                Description = "Finance & Expenditure management",
                Color = "#059669",
                Icon = "payments",
                Priority = 4,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Contract Manager",
                Description = "Contract lifecycle management",
                Color = "#EA580C",
                Icon = "description",
                Priority = 5,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Vendor Manager",
                Description = "Vendor management",
                Color = "#0891B2",
                Icon = "groups",
                Priority = 6,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Legal Manager",
                Description = "Legal review and approval",
                Color = "#9333EA",
                Icon = "gavel",
                Priority = 7,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Finance Approver",
                Description = "Expense and payment approvals",
                Color = "#16A34A",
                Icon = "verified",
                Priority = 8,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Department Manager",
                Description = "Department approvals",
                Color = "#0F766E",
                Icon = "apartment",
                Priority = 9,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Auditor",
                Description = "Audit and compliance",
                Color = "#6B7280",
                Icon = "fact_check",
                Priority = 10,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Viewer",
                Description = "Read only access",
                Color = "#64748B",
                Icon = "visibility",
                Priority = 11,
                IsSystemRole = true,
                IsActive = true
            },

            new()
            {
                Name = "Vendor User",
                Description = "Vendor Portal User",
                Color = "#0EA5E9",
                Icon = "store",
                Priority = 12,
                IsSystemRole = true,
                IsActive = true
            }
        };
    }
}