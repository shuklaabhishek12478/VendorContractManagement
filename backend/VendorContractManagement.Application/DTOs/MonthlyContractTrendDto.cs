using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class MonthlyContractTrendDto
    {
        public string Month { get; set; } = string.Empty;

        public int TotalContracts { get; set; }
    }
}
