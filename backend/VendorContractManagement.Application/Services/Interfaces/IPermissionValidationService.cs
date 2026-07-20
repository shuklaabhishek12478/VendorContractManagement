using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Interfaces;

public interface IPermissionValidationService
{
    Task<PermissionValidationResultDto> ValidateAsync(
        List<int> permissionIds);
}
