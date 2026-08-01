using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class RolePermissionSeeder
{
    public static List<RolePermission> GetRolePermissions(
        List<Role> roles,
        List<Permission> permissions)
    {
        var result = new List<RolePermission>();

        foreach (var role in roles)
        {
            IEnumerable<Permission> rolePermissions =
                Enumerable.Empty<Permission>();

            switch (role.Name)
            {
                // =====================================================
                // SUPER ADMIN
                // =====================================================

                case "Super Admin":

                    rolePermissions = permissions;

                    break;

                // =====================================================
                // ADMIN
                // =====================================================

                case "Admin":

                    rolePermissions = permissions
                        .Where(x => x.Module != "Settings");

                    break;

                // =====================================================
                // PROCUREMENT MANAGER
                // =====================================================

                case "Procurement Manager":

                    rolePermissions = permissions.Where(x =>

                        // -------------------------
                        // Vendor
                        // -------------------------

                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||
                        x.Code == "Vendor.Create" ||
                        x.Code == "Vendor.Edit" ||
                        x.Code == "Vendor.Delete" ||
                        x.Code == "Vendor.Activate" ||
                        x.Code == "Vendor.Deactivate" ||
                        x.Code == "Vendor.Approve" ||
                        x.Code == "Vendor.Reject" ||
                        x.Code == "Vendor.Export" ||
                        x.Code == "Vendor.Import" ||
                        x.Code == "Vendor.Documents" ||
                        x.Code == "Vendor.Dashboard" ||

                        // -------------------------
                        // Contract
                        // -------------------------

                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||
                        x.Code == "Contract.Create" ||
                        x.Code == "Contract.Edit" ||
                        x.Code == "Contract.Delete" ||
                        x.Code == "Contract.Submit" ||
                        x.Code == "Contract.Approve" ||
                        x.Code == "Contract.Reject" ||
                        x.Code == "Contract.Activate" ||
                        x.Code == "Contract.Terminate" ||
                        x.Code == "Contract.Renew" ||
                        x.Code == "Contract.RenewApprove" ||
                        x.Code == "Contract.RenewReject" ||
                        x.Code == "Contract.RenewHistory" ||
                        x.Code == "Contract.Export" ||
                        x.Code == "Contract.Import" ||
                        x.Code == "Contract.Dashboard" ||

                        // -------------------------
                        // Reports
                        // -------------------------

                        x.Code == "Report.View" ||
                        x.Code == "Report.Export" ||

                        // -------------------------
                        // Notifications
                        // -------------------------

                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // FINANCE MANAGER
                // =====================================================

                case "Finance Manager":

                    rolePermissions = permissions.Where(x =>

                        // Expenditure
                        x.Code == "Expenditure.View" ||
                        x.Code == "Expenditure.Create" ||
                        x.Code == "Expenditure.Update" ||
                        x.Code == "Expenditure.Delete" ||
                        x.Code == "Expenditure.Search" ||
                        x.Code == "Expenditure.Dashboard" ||
                        x.Code == "Expenditure.Forecast" ||

                        // Contracts (Read Only)
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||
                        x.Code == "Contract.Export" ||

                        // Vendors (Read Only)
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||
                        x.Code == "Vendor.Export" ||

                        // Reports
                        x.Code == "Report.View" ||
                        x.Code == "Report.Export" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // CONTRACT MANAGER
                // =====================================================

                case "Contract Manager":

                    rolePermissions = permissions.Where(x =>

                        // Contracts
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||
                        x.Code == "Contract.Create" ||
                        x.Code == "Contract.Edit" ||
                        x.Code == "Contract.Delete" ||
                        x.Code == "Contract.Submit" ||
                        x.Code == "Contract.Approve" ||
                        x.Code == "Contract.Reject" ||
                        x.Code == "Contract.Activate" ||
                        x.Code == "Contract.Terminate" ||
                        x.Code == "Contract.Renew" ||
                        x.Code == "Contract.RenewApprove" ||
                        x.Code == "Contract.RenewReject" ||
                        x.Code == "Contract.RenewHistory" ||
                        x.Code == "Contract.Export" ||
                        x.Code == "Contract.Import" ||
                        x.Code == "Contract.Dashboard" ||

                        // Vendors (Read Only)
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||

                        // Reports
                        x.Code == "Report.View" ||
                        x.Code == "Report.Export" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // VENDOR MANAGER
                // =====================================================

                case "Vendor Manager":

                    rolePermissions = permissions.Where(x =>

                        // Vendors
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||
                        x.Code == "Vendor.Create" ||
                        x.Code == "Vendor.Edit" ||
                        x.Code == "Vendor.Delete" ||
                        x.Code == "Vendor.Activate" ||
                        x.Code == "Vendor.Deactivate" ||
                        x.Code == "Vendor.Approve" ||
                        x.Code == "Vendor.Reject" ||
                        x.Code == "Vendor.Documents" ||
                        x.Code == "Vendor.Import" ||
                        x.Code == "Vendor.Export" ||
                        x.Code == "Vendor.Dashboard" ||

                        // Contracts (Read Only)
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||

                        // Reports
                        x.Code == "Report.View" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // LEGAL MANAGER
                // =====================================================

                case "Legal Manager":

                    rolePermissions = permissions.Where(x =>

                        // Contract Review
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||
                        x.Code == "Contract.Approve" ||
                        x.Code == "Contract.Reject" ||
                        x.Code == "Contract.RenewApprove" ||
                        x.Code == "Contract.RenewReject" ||
                        x.Code == "Contract.RenewHistory" ||

                        // Vendors (Read Only)
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||

                        // Reports
                        x.Code == "Report.View" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // FINANCE APPROVER
                // =====================================================

                case "Finance Approver":

                    rolePermissions = permissions.Where(x =>

                        // Expenditure
                        x.Code == "Expenditure.View" ||
                        x.Code == "Expenditure.Update" ||
                        x.Code == "Expenditure.Search" ||
                        x.Code == "Expenditure.Dashboard" ||

                        // Vendors
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||

                        // Contracts
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||

                        // Reports
                        x.Code == "Report.View" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // DEPARTMENT MANAGER
                // =====================================================

                case "Department Manager":

                    rolePermissions = permissions.Where(x =>

                        // Vendors
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||

                        // Contracts
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||

                        // Expenditure
                        x.Code == "Expenditure.View" ||
                        x.Code == "Expenditure.Search" ||

                        // Reports
                        x.Code == "Report.View" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;

                // =====================================================
                // AUDITOR
                // =====================================================

                case "Auditor":

                    rolePermissions = permissions.Where(x =>

                        // Read Only
                        x.Code.EndsWith(".View") ||

                        x.Code.EndsWith(".ViewDetails") ||

                        // Export
                        x.Code.EndsWith(".Export") ||

                        // Dashboards
                        x.Code == "Vendor.Dashboard" ||
                        x.Code == "Contract.Dashboard" ||
                        x.Code == "Expenditure.Dashboard" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;


                // =====================================================
                // VIEWER
                // =====================================================

                case "Viewer":

                    rolePermissions = permissions.Where(x =>

                        x.Code.EndsWith(".View") ||

                        x.Code.EndsWith(".ViewDetails") ||

                        x.Code == "Notification.View"

                    );

                    break;


                // =====================================================
                // VENDOR USER
                // =====================================================

                case "Vendor User":

                    rolePermissions = permissions.Where(x =>

                        // Vendor
                        x.Code == "Vendor.View" ||
                        x.Code == "Vendor.ViewDetails" ||

                        // Contract
                        x.Code == "Contract.View" ||
                        x.Code == "Contract.ViewDetails" ||

                        // Own Profile
                        x.Code == "User.Profile" ||

                        // Notifications
                        x.Code == "Notification.View" ||
                        x.Code == "Notification.Update"

                    );

                    break;


                // =====================================================
                // DEFAULT
                // =====================================================

                default:

                    rolePermissions = Enumerable.Empty<Permission>();

                    break;
            }

            foreach (var permission in rolePermissions.Distinct())
            {
                result.Add(new RolePermission
                {
                    RoleId = role.Id,
                    PermissionId = permission.Id,
                    AssignedOn = DateTime.UtcNow,
                    AssignedBy = "System"
                });
            }

        }

        return result;
    }
}