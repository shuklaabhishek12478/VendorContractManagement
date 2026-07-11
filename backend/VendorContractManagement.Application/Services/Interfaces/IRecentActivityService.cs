using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IRecentActivityService
    {
       
        Task<IEnumerable<RecentActivityDto>> GetRecentAsync(int count);
        Task<List<RecentActivityDto>> GetByVendorIdAsync(int vendorId, int count = 20);
        
        Task LogAsync(
    string module,
    string action,
    string description,
    int? entityId = null,
    string? entityName = null,
    string? entityType = null,
    string? performedBy = null);
    }
}
