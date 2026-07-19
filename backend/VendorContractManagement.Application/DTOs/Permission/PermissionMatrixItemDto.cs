using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs.Role;

public class PermissionMatrixItemDto
{
    public int PermissionId { get; set; }

    public string PermissionName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public bool Assigned { get; set; }
}
