using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.DTOs.Users;
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

        public async Task<(List<User> Items, int TotalCount)> GetPagedAsync(
    UserQueryDto query)
        {
            var users = _context.Users
    .Include(x => x.Vendor)
    .Include(x => x.UserRoles)
        .ThenInclude(x => x.Role)
    .AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                users = users.Where(x =>
                    x.FullName.Contains(query.Search) ||
                    x.Email.Contains(query.Search));
            }

            // Active Filter
            if (query.IsActive.HasValue)
            {
                users = users.Where(x =>
                    x.IsActive == query.IsActive.Value);
            }

            // Sorting
            users = query.SortBy?.ToLower() switch
            {
                "fullname" => query.SortDirection == "desc"
                    ? users.OrderByDescending(x => x.FullName)
                    : users.OrderBy(x => x.FullName),

                "email" => query.SortDirection == "desc"
                    ? users.OrderByDescending(x => x.Email)
                    : users.OrderBy(x => x.Email),

                "isactive" => query.SortDirection == "desc"
                    ? users.OrderByDescending(x => x.IsActive)
                    : users.OrderBy(x => x.IsActive),

                _ => users.OrderByDescending(x => x.Id)
            };

            var totalCount = await users.CountAsync();

            var items = await users
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            return (items, totalCount);
        }
    }
}