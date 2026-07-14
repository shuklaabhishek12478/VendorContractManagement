using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs.Permission;

namespace VendorContractManagement.Application.Services.Interfaces;

public interface IPermissionService
{
    Task<bool> HasPermissionAsync(
        int userId,
        string permission);
    Task<List<PermissionDto>> GetAllAsync();
}


