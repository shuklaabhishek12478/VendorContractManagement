using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class ContractValueTrendDto
    {
        public string Month { get; set; } = string.Empty;

        public decimal TotalValue { get; set; }
    }
}
