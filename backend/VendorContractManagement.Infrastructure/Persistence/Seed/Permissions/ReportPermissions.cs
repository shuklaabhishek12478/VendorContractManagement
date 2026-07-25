using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class ReportPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new Permission
            {
                Module = "Report",
                Name = "View Reports",
                Code = "Report.View",
                Description = "View reports and dashboards"
            },

            new Permission
            {
                Module = "Report",
                Name = "Export Reports",
                Code = "Report.Export",
                Description = "Export reports to Excel/PDF"
            }
        };
    }
}