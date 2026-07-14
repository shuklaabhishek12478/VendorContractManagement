using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Application.DTOs.Role;

public class RoleStatisticsDto
{
    public int TotalRoles { get; set; }

    public int ActiveRoles { get; set; }

    public int InactiveRoles { get; set; }

    public int SystemRoles { get; set; }

    public int CustomRoles { get; set; }
}
