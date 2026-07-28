
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface INotificationHub
{
    Task SendNotificationAsync(NotificationDto dto);

    Task SendToUserAsync(int userId, NotificationDto dto);
}