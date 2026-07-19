using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs.Role;

public class UpdatePermissionMatrixDto
{
    public List<int> PermissionIds { get; set; } = new();
}
