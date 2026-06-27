using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class ExpiryAnalyticsDto
    {
        public int Next7Days { get; set; }

        public int Next15Days { get; set; }

        public int Next30Days { get; set; }
    }
}
