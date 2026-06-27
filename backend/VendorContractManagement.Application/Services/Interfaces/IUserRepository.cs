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
    }
}