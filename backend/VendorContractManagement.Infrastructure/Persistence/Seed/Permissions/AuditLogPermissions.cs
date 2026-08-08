using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class AuditLogPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new Permission
            {
                Name = "View Audit Logs",
                Code = "AuditLog.View",
                Module = "AuditLog",
                Description = "View audit logs"
            },

            new Permission
            {
                Name = "Export Audit Logs",
                Code = "AuditLog.Export",
                Module = "AuditLog",
                Description = "Export audit logs"
            }
        };
    }
}