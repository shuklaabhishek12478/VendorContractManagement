using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Interfaces;

public interface IPermissionRepository
{
    Task<bool> UserHasPermissionAsync(
        int userId,
        string permissionCode);

    Task<List<Permission>> GetAllAsync();

    Task<Permission?> GetByIdAsync(int id);

}
