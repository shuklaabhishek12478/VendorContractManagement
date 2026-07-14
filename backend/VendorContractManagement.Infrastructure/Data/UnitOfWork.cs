using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IVendorRepository Vendors { get; }

        public IContractRepository Contracts { get; }

        public IDocumentRepository Documents { get; }

        public IAuditLogRepository AuditLogs { get; }

        public IRoleRepository Roles { get; }

        public IUserRepository Users { get; }

        public IExpenditureRepository Expenditures { get; }

        public IVendorDocumentRepository VendorDocuments { get; }

        public IRecentActivityRepository RecentActivities { get; }

        public UnitOfWork(
            AppDbContext context,
            IVendorRepository vendorRepository,
            IContractRepository contractRepository,
            IDocumentRepository documentRepository,
            IAuditLogRepository auditLogRepository,
            IRoleRepository roleRepository,
            IUserRepository userRepository,
            IExpenditureRepository expenditureRepository,
            IVendorDocumentRepository vendorDocumentRepository,
            IRecentActivityRepository recentActivityRepository)
        {
            _context = context;

            Vendors = vendorRepository;

            Contracts = contractRepository;

            Documents = documentRepository;

            AuditLogs = auditLogRepository;

            Roles = roleRepository;

            Users = userRepository;

            Expenditures = expenditureRepository;

            VendorDocuments = vendorDocumentRepository;

            RecentActivities = recentActivityRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}