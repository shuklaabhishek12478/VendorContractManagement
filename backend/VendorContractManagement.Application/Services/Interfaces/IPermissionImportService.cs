using Microsoft.AspNetCore.Http;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Interfaces;

public interface IPermissionImportService
{
    Task<PermissionImportDto> ImportAsync(
    int roleId,
    IFormFile file);
}