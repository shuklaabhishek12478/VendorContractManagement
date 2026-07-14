using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class VendorPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new()
            {
                Name = "View Vendors",
                Code = "Vendor.View",
                Module = "Vendor",
                Description = "View vendor list"
            },

            new()
            {
                Name = "View Vendor Details",
                Code = "Vendor.ViewDetails",
                Module = "Vendor",
                Description = "View vendor details"
            },

            new()
            {
                Name = "Create Vendor",
                Code = "Vendor.Create",
                Module = "Vendor",
                Description = "Create vendor"
            },

            new()
            {
                Name = "Edit Vendor",
                Code = "Vendor.Edit",
                Module = "Vendor",
                Description = "Edit vendor"
            },

            new()
            {
                Name = "Delete Vendor",
                Code = "Vendor.Delete",
                Module = "Vendor",
                Description = "Delete vendor"
            },

            new()
            {
                Name = "Activate Vendor",
                Code = "Vendor.Activate",
                Module = "Vendor",
                Description = "Activate vendor"
            },

            new()
            {
                Name = "Deactivate Vendor",
                Code = "Vendor.Deactivate",
                Module = "Vendor",
                Description = "Deactivate vendor"
            },

            new()
            {
                Name = "Approve Vendor",
                Code = "Vendor.Approve",
                Module = "Vendor",
                Description = "Approve vendor"
            },

            new()
            {
                Name = "Reject Vendor",
                Code = "Vendor.Reject",
                Module = "Vendor",
                Description = "Reject vendor"
            },

            new()
            {
                Name = "Export Vendors",
                Code = "Vendor.Export",
                Module = "Vendor",
                Description = "Export vendor data"
            },

            new()
            {
                Name = "Import Vendors",
                Code = "Vendor.Import",
                Module = "Vendor",
                Description = "Import vendors"
            },

            new()
            {
                Name = "Manage Vendor Documents",
                Code = "Vendor.Documents",
                Module = "Vendor",
                Description = "Manage vendor documents"
            },

            new()
            {
                Name = "View Vendor Dashboard",
                Code = "Vendor.Dashboard",
                Module = "Vendor",
                Description = "View vendor dashboard"
            }
        };
    }
}