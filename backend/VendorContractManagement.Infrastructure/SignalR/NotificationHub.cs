using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace VendorContractManagement.Infrastructure.SignalR;

[Authorize]
public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId =
            Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrWhiteSpace(userId))
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                $"USER_{userId}");
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId =
            Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrWhiteSpace(userId))
        {
            await Groups.RemoveFromGroupAsync(
                Context.ConnectionId,
                $"USER_{userId}");
        }

        await base.OnDisconnectedAsync(exception);
    }
}