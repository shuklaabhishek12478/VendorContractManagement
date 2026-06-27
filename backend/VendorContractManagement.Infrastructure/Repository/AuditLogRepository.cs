using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository
{
    public class AuditLogRepository : IAuditLogRepository
    {
        private readonly AppDbContext _context;

        public AuditLogRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(AuditLog auditLog)
        {
            await _context.AuditLogs.AddAsync(auditLog);
        }

        public async Task<IEnumerable<AuditLog>> GetAllAsync()
        {
            return await _context.AuditLogs
                .OrderByDescending(x => x.CreatedOn)
                .ToListAsync();
        }

        public Task<IQueryable<AuditLog>> Query()
        {
            return Task.FromResult(_context.AuditLogs.AsQueryable());
        }


        public async Task<IEnumerable<AuditLog>>GetRecentAsync(int count)
        {
            return await _context.AuditLogs
                .OrderByDescending(x => x.Id)
                .Take(count)
                .ToListAsync();
        }
    }
}