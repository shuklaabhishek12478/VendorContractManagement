using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class RenewContractDto
    {
        public DateTime NewStartDate { get; set; }

        public DateTime NewEndDate { get; set; }

        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}
