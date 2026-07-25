using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Helpers;

public class NotificationHelper
{
    private readonly INotificationService _notificationService;
    private readonly INotificationHub _notificationHub;
    private readonly IUserContextService _userContext;

    public NotificationHelper(
        INotificationService notificationService,
        INotificationHub notificationHub,
        IUserContextService userContext)
    {
        _notificationService = notificationService;
        _notificationHub = notificationHub;
        _userContext = userContext;
    }

    public async Task CreateAsync(
        string module,
        string title,
        string message,
        int? entityId = null,
        int? userId = null,
        string? actionUrl = null,
        NotificationType type = NotificationType.Info)
    {
        // If caller didn't pass UserId, use logged-in user
        if (!userId.HasValue)
        {
            userId = _userContext.UserId;
        }

        var createDto = new CreateNotificationDto
        {
            UserId = userId,
            Module = module,
            Type = type,
            Title = title,
            Message = message,
            EntityId = entityId,
            ActionUrl = actionUrl
        };

        // Save into database
        await _notificationService.CreateAsync(createDto);

        // Push to SignalR
        await _notificationHub.SendNotificationAsync(
            new NotificationDto
            {
                UserId = userId,
                Module = module,
                Type = type,
                Title = title,
                Message = message,
                EntityId = entityId,
                ActionUrl = actionUrl,
                IsRead = false,
                CreatedOn = DateTime.UtcNow
            });
    }
}