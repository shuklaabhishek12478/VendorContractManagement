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

        Task<IEnumerable<RecentActivity>> GetRecentAsync(int count = 20);
    }
}
