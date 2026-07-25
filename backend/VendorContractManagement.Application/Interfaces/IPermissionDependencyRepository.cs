using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Application.DTOs;

public interface IPermissionDependencyRepository
{
    Task<List<PermissionDependency>> GetAllAsync();

    Task<List<PermissionRuleDto>> GetPermissionRulesAsync();
}