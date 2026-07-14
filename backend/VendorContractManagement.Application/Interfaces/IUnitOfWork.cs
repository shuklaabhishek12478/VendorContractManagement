using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IVendorRepository Vendors { get; }

        IContractRepository Contracts { get; }

        IDocumentRepository Documents { get; }

        IAuditLogRepository AuditLogs { get; }

        IRoleRepository Roles { get; }
        Task<int> SaveChangesAsync();
        IUserRepository Users { get; }

        IExpenditureRepository Expenditures { get; }

        IVendorDocumentRepository VendorDocuments { get; }

        IRecentActivityRepository RecentActivities { get; }
    }
}
