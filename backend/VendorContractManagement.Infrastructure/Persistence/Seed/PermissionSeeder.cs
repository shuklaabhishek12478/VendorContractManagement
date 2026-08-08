using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data.Seed.Permissions;

namespace VendorContractManagement.Infrastructure.Data.Seed;

public static class PermissionSeeder
{
    public static List<Permission> GetPermissions()
    {
        var permissions = new List<Permission>();

        permissions.AddRange(VendorPermissions.Get());
        permissions.AddRange(ContractPermissions.Get());
        permissions.AddRange(UserPermissions.Get());
        permissions.AddRange(RolePermissions.Get());
        permissions.AddRange(ExpenditurePermissions.Get());
        permissions.AddRange(ReportPermissions.Get());
        permissions.AddRange(NotificationPermissions.Get());
        permissions.AddRange(UserApprovalPermissions.Get());
        permissions.AddRange(AuditLogPermissions.Get());
        permissions.AddRange(DashboardPermissions.Get());
        permissions.AddRange(RecentActivityPermissions.Get());
        permissions.AddRange(AnalyticsPermissions.Get());
        return permissions;
    }
}