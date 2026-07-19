using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs.Role;

public class PermissionGroupDto
{
    public string Module { get; set; } = string.Empty;

    public List<PermissionMatrixItemDto> Permissions { get; set; }
        = new();
}
