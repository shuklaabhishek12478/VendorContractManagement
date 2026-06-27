using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IAuditLogRepository
    {
        Task AddAsync(AuditLog auditLog);

        Task<IEnumerable<AuditLog>> GetAllAsync();

        Task<IQueryable<AuditLog>> Query();

        Task<IEnumerable<AuditLog>>GetRecentAsync(int count);
    }
}
