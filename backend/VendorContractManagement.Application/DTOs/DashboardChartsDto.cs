using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class DashboardChartsDto
    {
        public IEnumerable<ContractStatusAnalyticsDto>
            StatusDistribution
        { get; set; }
            = new List<ContractStatusAnalyticsDto>();

        public IEnumerable<MonthlyContractTrendDto>
            MonthlyTrend
        { get; set; }
            = new List<MonthlyContractTrendDto>();

        public IEnumerable<ContractValueTrendDto>
            ContractValueTrend
        { get; set; }
            = new List<ContractValueTrendDto>();

        public IEnumerable<TopVendorDto>
            TopVendors
        { get; set; }
            = new List<TopVendorDto>();

        public ExpiryAnalyticsDto
            ExpiryAnalytics
        { get; set; }
            = new();
    }
}
