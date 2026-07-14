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

    Task<PermissionDto?> GetByIdAsync(int id);

    Task<List<string>> GetModulesAsync();

    Task<List<PermissionDto>> GetByModuleAsync(string module);
    Task<Dictionary<string, List<PermissionDto>>> GetGroupedAsync();

    Task<List<PermissionDto>> GetByIdsAsync(
    List<int> permissionIds);
}


