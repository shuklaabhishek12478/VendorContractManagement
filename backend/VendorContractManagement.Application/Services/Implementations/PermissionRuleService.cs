using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;

namespace VendorContractManagement.Application.Services
{
    public class PermissionRuleService
        : IPermissionRuleService
    {
        private readonly IPermissionDependencyRepository _repository;

        public PermissionRuleService(
            IPermissionDependencyRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<PermissionRuleDto>> GetRulesAsync()
        {
            return await _repository.GetPermissionRulesAsync();
        }
    }
}