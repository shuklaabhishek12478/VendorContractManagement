using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Interfaces;

public interface IPermissionRuleService
{
    Task<List<PermissionRuleDto>> GetRulesAsync();

    Task<List<int>> ApplyDependenciesAsync(
        IEnumerable<int> permissionIds);

    Task<bool> ValidateAsync(
        IEnumerable<int> permissionIds);
}