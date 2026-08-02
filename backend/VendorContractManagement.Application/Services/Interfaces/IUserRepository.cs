using VendorContractManagement.Application.DTOs.Users;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);

        Task AddAsync(User user);

        Task<User?> GetByRefreshTokenAsync(string refreshToken);

        Task<IEnumerable<User>> GetAllAsync();

        Task<User?> GetByIdAsync(int id);

        void Update(User user);

        Task<bool> ExistsAsync(int id);

        Task DeleteAsync(User user);

        Task SaveChangesAsync();

        Task<List<UserRole>> GetUserRolesAsync(int userId);

        Task RemoveUserRolesAsync(List<UserRole> userRoles);

        Task AddUserRolesAsync(List<UserRole> userRoles);

        Task<(List<User> Items, int TotalCount)> GetPagedAsync(
    UserQueryDto query);

        Task<List<User>> GetPendingApprovalUsersAsync();

        Task ApproveUserAsync(
            int userId,
            int roleId,
            int approvedByUserId);

        Task RejectUserAsync(
    int userId,
    string reason,
    int rejectedByUserId);

        Task<User?> GetByPasswordResetTokenAsync(string token);

       


    }
}