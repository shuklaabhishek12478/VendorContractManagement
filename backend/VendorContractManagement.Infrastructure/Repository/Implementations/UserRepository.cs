using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
    .Include(x => x.UserRoles)
        .ThenInclude(x => x.Role)
    .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<User?> GetByRefreshTokenAsync(string refreshToken)
        {
            return await _context.Users
                .Include(x => x.UserRoles)
        .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(
                    x => x.RefreshToken == refreshToken);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
     .Include(x => x.Vendor)
    .Include(x => x.UserRoles)
        .ThenInclude(x => x.Role)
    .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(x => x.Vendor)

                .Include(x => x.UserRoles)

                    .ThenInclude(x => x.Role)

                        .ThenInclude(x => x.RolePermissions)

                            .ThenInclude(x => x.Permission)

                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Users.AnyAsync(x => x.Id == id);
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);

            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserRole>> GetUserRolesAsync(int userId)
        {
            return await _context.UserRoles
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task RemoveUserRolesAsync(List<UserRole> userRoles)
        {
            _context.UserRoles.RemoveRange(userRoles);

            await Task.CompletedTask;
        }

        public async Task AddUserRolesAsync(List<UserRole> userRoles)
        {
            await _context.UserRoles.AddRangeAsync(userRoles);
        }
    }
}