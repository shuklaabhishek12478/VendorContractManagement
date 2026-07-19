using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs
{
    public class PermissionRuleDto
    {
        public string Permission { get; set; } = string.Empty;

        public List<string> Requires { get; set; } = new();
    }
}
