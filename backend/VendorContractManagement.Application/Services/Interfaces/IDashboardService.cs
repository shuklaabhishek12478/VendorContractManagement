using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync();

        Task<VendorDashboardDto>GetVendorDashboardAsync();

        Task<AnalyticsDto> GetAnalyticsAsync();

        Task<IEnumerable<TopVendorDto>>GetTopVendorsAsync(int count);

        Task<IEnumerable<ContractStatusAnalyticsDto>>GetStatusDistributionAsync();

        Task<IEnumerable<MonthlyContractTrendDto>>GetMonthlyContractTrendAsync();

        Task<IEnumerable<ContractValueTrendDto>>GetContractValueTrendAsync();

        Task<ExpiryAnalyticsDto>GetExpiryAnalyticsAsync();

        Task<DashboardChartsDto>GetChartsAsync();

        Task<IEnumerable<NotificationDto>>GetNotificationsAsync();

        Task<IEnumerable<RecentActivityDto>>GetRecentActivitiesAsync();

    }
}
