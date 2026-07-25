using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface INotificationService
{
    Task CreateAsync(CreateNotificationDto dto);

    Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);

    Task<int> GetUnreadCountAsync(int userId);

    Task MarkAsReadAsync(int notificationId);

    Task MarkAllAsReadAsync(int userId);

    Task<List<NotificationDto>> GetNotificationsAsync();

    Task<int> GetUnreadCountAsync();

    Task<List<NotificationDto>> GetNotificationsAsync(string userId);
}