using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class ContractStatusAnalyticsDto
    {
        public string Status { get; set; } = string.Empty;

        public int Count { get; set; }
    }
}
