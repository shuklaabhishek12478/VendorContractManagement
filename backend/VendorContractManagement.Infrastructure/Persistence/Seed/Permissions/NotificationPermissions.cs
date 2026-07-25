using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class NotificationPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new Permission
            {
                Name = "View Notifications",
                Code = "Notification.View",
                Module = "Notification",
                Description = "View Notifications"
            },
            new Permission
            {
                Name = "Create Notifications",
                Code = "Notification.Create",
                Module = "Notification",
                Description = "Create Notifications"
            },
            new Permission
            {
                Name = "Update Notifications",
                Code = "Notification.Update",
                Module = "Notification",
                Description = "Update Notifications"
            },
            new Permission
            {
                Name = "Delete Notifications",
                Code = "Notification.Delete",
                Module = "Notification",
                Description = "Delete Notifications"
            }
        };
    }
}