using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs.Role;

public class AssignUsersToRoleDto
{
    public List<int> UserIds { get; set; } = new();
    public List<int> RoleIds { get; set; } = [];
}
