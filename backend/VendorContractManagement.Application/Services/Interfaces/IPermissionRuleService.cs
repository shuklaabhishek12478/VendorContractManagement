using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Interfaces
{
    public interface IPermissionRuleService
    {
        Task<List<PermissionRuleDto>> GetRulesAsync();
    }
}