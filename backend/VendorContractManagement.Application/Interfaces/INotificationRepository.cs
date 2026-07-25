using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces;

public interface INotificationRepository
{
    Task AddAsync(Notification notification);

    Task<List<Notification>> GetByUserAsync(int userId);

    Task<int> GetUnreadCountAsync(int userId);

    Task<Notification?> GetByIdAsync(int id);

    void Update(Notification notification);
}