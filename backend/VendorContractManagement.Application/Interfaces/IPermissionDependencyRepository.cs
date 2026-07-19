using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IPermissionDependencyRepository
    {
        Task<List<PermissionRuleDto>> GetPermissionRulesAsync();
    }
}