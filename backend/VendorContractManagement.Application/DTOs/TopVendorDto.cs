using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class TopVendorDto
    {
        public string VendorName { get; set; } = string.Empty;

        public decimal TotalContractValue { get; set; }
    }
}
