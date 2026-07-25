using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs;

public class CreateNotificationDto
{
    public int? UserId { get; set; }

    public string Module { get; set; } = string.Empty;

    public NotificationType Type { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public string? ActionUrl { get; set; }

    public int? EntityId { get; set; }
}