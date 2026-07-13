using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IRecentActivityRepository
    {
        Task AddAsync(RecentActivity activity);
        Task<List<RecentActivity>> GetByVendorIdAsync(
    int vendorId,
    int count);

        Task<IEnumerable<RecentActivity>> GetRecentAsync(int count = 20);

        Task<List<RecentActivity>> GetByContractIdAsync(
    int contractId,
    int count);
    }
}
