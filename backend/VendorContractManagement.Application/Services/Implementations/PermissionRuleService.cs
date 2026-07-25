using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services;

public class PermissionRuleService
    : IPermissionRuleService
{
    private readonly IPermissionDependencyRepository
        _repository;

    public PermissionRuleService(
        IPermissionDependencyRepository repository)
    {
        _repository = repository;
    }

    //----------------------------------------------------
    // Used by Angular Permission Matrix
    //----------------------------------------------------

    public async Task<List<PermissionRuleDto>> GetRulesAsync()
    {
        return await _repository.GetPermissionRulesAsync();
    }

    //----------------------------------------------------
    // Auto Apply Dependencies
    //----------------------------------------------------

    public async Task<List<int>> ApplyDependenciesAsync(
        IEnumerable<int> permissionIds)
    {
        var result = permissionIds.ToHashSet();

        var dependencies =
            await _repository.GetAllAsync();

        bool changed;

        do
        {
            changed = false;

            foreach (var dependency in dependencies)
            {
                if (
                    result.Contains(dependency.PermissionId)
                    &&
                    !result.Contains(
                        dependency.DependsOnPermissionId))
                {
                    result.Add(
                        dependency.DependsOnPermissionId);

                    changed = true;
                }
            }

        } while (changed);

        return result.ToList();
    }

    //----------------------------------------------------
    // Validate Permission Graph
    //----------------------------------------------------

    public async Task<bool> ValidateAsync(
        IEnumerable<int> permissionIds)
    {
        var selected = permissionIds.ToHashSet();

        var dependencies =
            await _repository.GetAllAsync();

        foreach (var dependency in dependencies)
        {
            if (
                selected.Contains(
                    dependency.PermissionId)
                &&
                !selected.Contains(
                    dependency.DependsOnPermissionId))
            {
                return false;
            }
        }

        return true;
    }
}