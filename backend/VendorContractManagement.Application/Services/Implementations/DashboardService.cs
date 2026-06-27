using System.Text.Json;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;

public class DashboardService : IDashboardService
{
    private readonly IVendorRepository _vendorRepository;
    private readonly IContractRepository _contractRepository;
    private readonly IDocumentRepository _documentRepository;
    private readonly IAuditLogRepository _auditRepository;
   // private readonly ICacheService _cache;
    private readonly IUserContextService _userContext;
    private readonly IRecentActivityRepository _recentActivityRepository;

    public DashboardService(
        IVendorRepository vendorRepository,
        IContractRepository contractRepository,
        IDocumentRepository documentRepository,
        IAuditLogRepository auditRepository,
        IUserContextService userContext,
        IRecentActivityRepository recentActivityRepository)
    {
        _vendorRepository = vendorRepository;
        _contractRepository = contractRepository;
        _documentRepository = documentRepository;
        _auditRepository = auditRepository;
        _userContext = userContext;
        _recentActivityRepository = recentActivityRepository;
    }

    public async Task<DashboardDto> GetDashboardAsync()
    {
        string cacheKey = "dashboard_data";

        // 🔥 CHECK CACHE FIRST
       // var cached = await _cache.GetAsync(cacheKey);

       // if (!string.IsNullOrEmpty(cached))
       // {
       //     return JsonSerializer.Deserialize<DashboardDto>(cached)!;
       // }

        var vendors = await _vendorRepository.GetAllAsync();
        var active = await _contractRepository.GetActiveAsync();
        var expired = await _contractRepository.GetExpiredAsync();
        var expiringSoon = await _contractRepository.GetExpiringSoonAsync(30);
        var contracts = await _contractRepository.GetAllAsync();
        var documents = await _documentRepository.GetCountAsync();
        var audits = await _auditRepository.GetAllAsync();
        var TotalDocuments = await _documentRepository.GetCountAsync();
        var today = DateTime.UtcNow;

        var result = new DashboardDto
        {
            TotalVendors = vendors.Count(),
            TotalContracts = contracts.Count(),
            ActiveContracts = contracts.Count(x => x.Status == ContractStatus.Active),
            ExpiredContracts = contracts.Count(x => x.Status == ContractStatus.Expired),
            PendingApprovalContracts = contracts.Count(x => x.Status == ContractStatus.PendingApproval),

            ApprovedContracts = contracts.Count(x =>
                x.Status == ContractStatus.Approved),

            RejectedContracts = contracts.Count(x =>
                x.Status == ContractStatus.Rejected),
            ExpiringSoonContracts = contracts.Count(x =>
                x.Status == ContractStatus.Active &&
                x.EndDate <= today.AddDays(7)),

            TotalDocuments = await _documentRepository.GetCountAsync(),

            TotalAuditLogs = audits.Count()
        };
        // 🔥 STORE IN CACHE (5 MIN)
       // await _cache.SetAsync(
       //     cacheKey,
       //     JsonSerializer.Serialize(result),
       //     TimeSpan.FromMinutes(5));

        return result;
    }

    public async Task<VendorDashboardDto>
    GetVendorDashboardAsync()
    {
        if (_userContext.VendorId == null)
            throw new Exception(
                "Vendor not found");

        var vendorId =
            _userContext.VendorId.Value;

        var contracts =
            await _contractRepository
                .GetByVendorIdAsync(vendorId);

        var totalContracts =
            contracts.Count();

        var activeContracts =
            contracts.Count(x =>
                x.Status ==
                ContractStatus.Active);

        var expiredContracts =
            contracts.Count(x =>
                x.Status ==
                ContractStatus.Expired);

        var pendingContracts = contracts.Count(x =>
                x.Status == ContractStatus.PendingApproval);

        var approvedContracts =
            contracts.Count(x =>
                x.Status == ContractStatus.Approved);

        var rejectedContracts =
            contracts.Count(x =>
                x.Status == ContractStatus.Rejected);

        var expiringSoonContracts =
            contracts.Count(x =>
                x.EndDate <= DateTime.UtcNow.AddDays(30)
                &&
                x.Status ==
                ContractStatus.Active);

        var documents =
            await _documentRepository
                .CountByVendorIdAsync(vendorId);

        return new VendorDashboardDto
        {
            TotalContracts =
                totalContracts,

            ActiveContracts =
                activeContracts,

            ExpiredContracts =
                expiredContracts,

            PendingApprovalContracts =
                pendingContracts,

            ApprovedContracts =
                approvedContracts,

            RejectedContracts =
                rejectedContracts,

            ExpiringSoonContracts =
                expiringSoonContracts,

            TotalDocuments =
                documents
        };
    }

    public async Task<AnalyticsDto> GetAnalyticsAsync()
    {
        if (_userContext.Role == "Vendor")
        {
            throw new UnauthorizedAccessException(
                "Access denied");
        }
        var contracts =
            await _contractRepository.GetAllAsync();

        var renewals = contracts.Where(x => x.IsRenewal);

        var thisMonth =
            DateTime.UtcNow;

        return new AnalyticsDto
        {
            TotalContracts =
                contracts.Count(),

            ActiveContracts =
                contracts.Count(x =>
                    x.Status == ContractStatus.Active),

            PendingApprovalContracts =
                contracts.Count(x =>
                    x.Status ==
                    ContractStatus.PendingApproval),

            ExpiredContracts =
                contracts.Count(x =>
                    x.Status == ContractStatus.Expired),

            TotalContractValue =
                contracts.Sum(x =>
                    x.ContractValue),

            ActiveContractValue =
                contracts
                    .Where(x =>
                        x.Status ==
                        ContractStatus.Active)
                    .Sum(x =>
                        x.ContractValue),

            ExpiringIn30Days =
                contracts.Count(x =>
                    x.Status ==
                    ContractStatus.Active
                    &&
                    x.EndDate <=
                    DateTime.UtcNow.AddDays(30)),

            TotalRenewals = contracts.Count(x => x.IsRenewal),

            RenewalsThisMonth = renewals.Count(x => x.CreatedOn.Month == thisMonth.Month && x.CreatedOn.Year == thisMonth.Year),

            PendingRenewals = renewals.Count(x => x.Status == ContractStatus.RenewalPendingApproval),

            ApprovedRenewals =
    renewals.Count(x =>
        x.Status ==
        ContractStatus.RenewalApproved),

            RejectedRenewals =
    renewals.Count(x =>
        x.Status ==
        ContractStatus.RenewalRejected),

            ActiveRenewals =
    renewals.Count(x =>
        x.Status ==
        ContractStatus.Active),
        };
    }


    public async Task<IEnumerable<TopVendorDto>>GetTopVendorsAsync(int count)
    {
        return await _contractRepository
            .GetTopVendorsAsync(count);
    }


    public async Task<IEnumerable<ContractStatusAnalyticsDto>>GetStatusDistributionAsync()
    {
        return await _contractRepository
            .GetStatusDistributionAsync();
    }

    public async Task<IEnumerable<MonthlyContractTrendDto>>GetMonthlyContractTrendAsync()
    {
        return await _contractRepository
            .GetMonthlyContractTrendAsync();
    }


    public async Task<IEnumerable<ContractValueTrendDto>>GetContractValueTrendAsync()
    {
        return await _contractRepository
            .GetContractValueTrendAsync();
    }



    public async Task<ExpiryAnalyticsDto>GetExpiryAnalyticsAsync()
    {
        return await _contractRepository
            .GetExpiryAnalyticsAsync();
    }


    public async Task<DashboardChartsDto>GetChartsAsync()
    {
        return new DashboardChartsDto
        {
            StatusDistribution =
                await GetStatusDistributionAsync(),

            MonthlyTrend =
                await GetMonthlyContractTrendAsync(),

            ContractValueTrend =
                await GetContractValueTrendAsync(),

            TopVendors =
                await GetTopVendorsAsync(5),

            ExpiryAnalytics =
                await GetExpiryAnalyticsAsync()
        };

    }


    public async Task<IEnumerable<NotificationDto>>GetNotificationsAsync()
    {
        var notifications =
            new List<NotificationDto>();

        var contracts =
            await _contractRepository.GetAllAsync();

        var pending =
            contracts.Count(x =>
                x.Status == ContractStatus.PendingApproval);

        if (pending > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = "PendingApproval",
                Title = "Pending Approvals",
                Message = $"{pending} contracts awaiting approval",
                CreatedOn = DateTime.UtcNow
            });
        }

        var expiring =
            contracts.Count(x =>
                x.Status == ContractStatus.Active &&
                x.EndDate <= DateTime.UtcNow.AddDays(30));

        if (expiring > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = "ExpiringSoon",
                Title = "Contracts Expiring",
                Message = $"{expiring} contracts expire within 30 days",
                CreatedOn = DateTime.UtcNow
            });
        }

        return notifications;
    }


    public async Task<IEnumerable<RecentActivityDto>> GetRecentActivitiesAsync()
    {
        var activities =
            await _recentActivityRepository
                .GetRecentAsync(10);

        return activities.Select(x =>
            new RecentActivityDto
            {
                Module = x.Module,
                Action = x.Action,
                EntityName = x.EntityName,
                EntityId = x.EntityId,
                PerformedBy = x.PerformedBy ?? string.Empty,
                CreatedOn = x.CreatedOn
            });
    }
}