using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs;

public class NotificationDto
{
    public int Id { get; set; }

    public string Module { get; set; } = string.Empty;

    public NotificationType Type { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public string? ActionUrl { get; set; }

    public int? EntityId { get; set; }

    public bool IsRead { get; set; }

    public DateTime CreatedOn { get; set; }
    public int? UserId { get; set; }
}