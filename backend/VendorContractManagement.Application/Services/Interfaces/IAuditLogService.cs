using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IAuditLogService
    {
        Task LogAsync(Domain.Entities.AuditLog log);

        Task<IEnumerable<AuditLogDto>> GetAllAsync();

        Task<PaginatedResult<AuditLogDto>> GetFilteredAsync(AuditLogFilterDto filter, int page, int pageSize);

        Task<byte[]> ExportToExcelAsync(AuditLogFilterDto filter);
    }
}