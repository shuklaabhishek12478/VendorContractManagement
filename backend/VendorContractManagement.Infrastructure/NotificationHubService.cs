using Microsoft.AspNetCore.SignalR;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.Infrastructure.SignalR;

public class NotificationHubService : INotificationHub
{
    private readonly IHubContext<NotificationHub> _hub;

    public NotificationHubService(
        IHubContext<NotificationHub> hub)
    {
        _hub = hub;
    }

    public async Task SendNotificationAsync(NotificationDto dto)
    {
        await _hub.Clients.All.SendAsync(
            "ReceiveNotification",
            dto);
    }

    public async Task SendToUserAsync(
        int userId,
        NotificationDto dto)
    {
        await _hub.Clients
            .Group($"USER_{userId}")
            .SendAsync(
                "ReceiveNotification",
                dto);
    }
}