using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations;

public class NotificationRepository
    : INotificationRepository
{
    private readonly AppDbContext _context;

    public NotificationRepository(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Notification notification)
    {
        await _context.Notifications
            .AddAsync(notification);
    }

    public async Task<List<Notification>>
        GetByUserAsync(int userId)
    {
        return await _context.Notifications

            .Where(x =>
                !x.IsDeleted &&
                x.UserId == userId)

            .OrderByDescending(x => x.CreatedOn)

            .ToListAsync();
    }

    public async Task<int>
        GetUnreadCountAsync(int userId)
    {
        return await _context.Notifications
            .CountAsync(x =>
                !x.IsDeleted &&
                !x.IsRead &&
                x.UserId == userId);
    }

    public async Task<Notification?>
        GetByIdAsync(int id)
    {
        return await _context.Notifications
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                !x.IsDeleted);
    }

    public void Update(
        Notification notification)
    {
        _context.Notifications.Update(notification);
    }
}