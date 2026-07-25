using AutoMapper;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Application.Exceptions;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Helpers;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations;

public class RoleService : IRoleService
{
    private readonly IUnitOfWork _unitOfWork;

    private readonly IMapper _mapper;

    private readonly ILogger<RoleService> _logger;

    private readonly IAuditLogService _auditLogService;

    private readonly IPermissionValidationService _permissionValidationService;

    private readonly IRecentActivityService _recentActivityService;

    private readonly NotificationHelper _notificationHelper;

    public RoleService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        ILogger<RoleService> logger,
        IAuditLogService auditLogService,
        IPermissionValidationService permissionValidationService,
        IRecentActivityService recentActivityService,
        NotificationHelper notificationHelper)
    {
        _unitOfWork = unitOfWork;

        _mapper = mapper;

        _logger = logger;

        _auditLogService = auditLogService;

        _permissionValidationService = permissionValidationService;

        _recentActivityService = recentActivityService;

        _notificationHelper = notificationHelper;
    }

    public async Task<List<RoleDto>> GetAllAsync()
    {
        _logger.LogInformation("Fetching all roles.");

        var roles =
            await _unitOfWork.Roles.GetAllAsync();

        var result = new List<RoleDto>();

        foreach (var role in roles)
        {
            var dto =
                _mapper.Map<RoleDto>(role);

            dto.UserCount =
                await _unitOfWork.Roles.CountUsersAsync(role.Id);

            dto.PermissionCount =
                await _unitOfWork.Roles.CountPermissionsAsync(role.Id);

            result.Add(dto);
        }

        _logger.LogInformation(
            "{Count} roles fetched successfully.",
            result.Count);

        return result;
    }

    public async Task<RoleDto?> GetByIdAsync(int id)
    {
        _logger.LogInformation(
            "Fetching role {RoleId}",
            id);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                id);

            return null;
        }

        var dto =
            _mapper.Map<RoleDto>(role);

        dto.UserCount =
            await _unitOfWork.Roles.CountUsersAsync(id);

        dto.PermissionCount =
            await _unitOfWork.Roles.CountPermissionsAsync(id);

        _logger.LogInformation(
            "Role {RoleId} loaded successfully.",
            id);

        return dto;
    }

    public async Task<RoleDto> CreateAsync(
    CreateRoleDto dto)
    {
        _logger.LogInformation(
            "Creating role {RoleName}",
            dto.Name);

        if (await _unitOfWork.Roles.ExistsAsync(dto.Name))
        {
            _logger.LogWarning(
                "Duplicate role creation attempted : {RoleName}",
                dto.Name);

            throw new ConflictException(
                "Role already exists.");
        }

        var role =
            _mapper.Map<Role>(dto);

        role.IsSystemRole = false;

        try
        {
            var created =
                await _unitOfWork.Roles.AddAsync(role);

            _logger.LogInformation(
                "Role created successfully. Id={RoleId}",
                created.Id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Created",
                message: $"Role '{created.Name}' has been created.",
                entityId: created.Id,
                actionUrl: $"/roles/{created.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Created",
                description:
                    $"Role '{created.Name}' created.",
                entityId: created.Id,
                entityName: created.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit Log

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Create",

                    EntityName = "Role",

                    EntityId = created.Id,

                    PerformedBy = "System",

                    OldValues = null,

                    NewValues =
                        JsonSerializer.Serialize(created),

                    CreatedOn = DateTime.UtcNow
                });

            return _mapper.Map<RoleDto>(created);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error creating role {RoleName}",
                dto.Name);

            throw;
        }
    }

    public async Task<RoleDto> UpdateAsync(
    int id,
    UpdateRoleDto dto)
    {
        _logger.LogInformation(
            "Updating role {RoleId}",
            id);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                id);

            throw new NotFoundException(
                "Role not found.");
        }

        if (await _unitOfWork.Roles.ExistsAsync(dto.Name, id))
        {
            throw new ConflictException(
                "Role name already exists.");
        }

        if (role.IsSystemRole &&
            role.Name != dto.Name)
        {
            throw new BusinessRuleException(
                "System role name cannot be changed.");
        }

        // Store Old Values

        var oldValues =
            JsonSerializer.Serialize(role);

        role.Name = dto.Name;
        role.Description = dto.Description;
        role.Color = dto.Color;
        role.Icon = dto.Icon;
        role.Priority = dto.Priority;
        role.IsActive = dto.IsActive;

        try
        {
            await _unitOfWork.Roles.UpdateAsync(role);

            _logger.LogInformation(
                "Role updated successfully. Id={RoleId}",
                id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Updated",
                message: $"Role '{role.Name}' has been updated.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Updated",
                description:
                    $"Role '{role.Name}' updated.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit Log

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Update",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues = oldValues,

                    NewValues =
                        JsonSerializer.Serialize(role),

                    CreatedOn = DateTime.UtcNow
                });

            return _mapper.Map<RoleDto>(role);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error updating role {RoleId}",
                id);

            throw;
        }
    }

    public async Task DeleteAsync(int id)
    {
        _logger.LogInformation(
            "Deleting role {RoleId}",
            id);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                id);

            throw new NotFoundException(
                "Role not found.");
        }

        if (role.IsSystemRole)
        {
            throw new BusinessRuleException(
                "System role cannot be deleted.");
        }

        var userCount =
            await _unitOfWork.Roles.CountUsersAsync(id);

        if (userCount > 0)
        {
            throw new BusinessRuleException(
                "Users are assigned to this role.");
        }

        var oldValues =
            System.Text.Json.JsonSerializer.Serialize(role);

        try
        {
            await _unitOfWork.Roles.DeleteAsync(role);

            _logger.LogInformation(
                "Role deleted successfully. Id={RoleId}",
                id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Deleted",
                message: $"Role '{role.Name}' has been deleted.",
                entityId: role.Id,
                actionUrl: "/roles");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Deleted",
                description:
                    $"Role '{role.Name}' deleted.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit Log

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Delete",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues = oldValues,

                    NewValues = null,

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error deleting role {RoleId}",
                id);

            throw;
        }
    }

    public async Task ActivateAsync(int id)
    {
        _logger.LogInformation(
            "Activating role {RoleId}",
            id);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                id);

            throw new NotFoundException(
                "Role not found.");
        }

        if (role.IsActive)
        {
            throw new BusinessRuleException(
                "Role is already active.");
        }

        var oldValues =
            JsonSerializer.Serialize(role);

        role.IsActive = true;

        try
        {
            await _unitOfWork.Roles.UpdateAsync(role);

            _logger.LogInformation(
                "Role activated successfully. Id={RoleId}",
                id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Activated",
                message: $"Role '{role.Name}' has been activated.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Activated",
                description: $"Role '{role.Name}' activated.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit Log

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Activate",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues = oldValues,

                    NewValues = JsonSerializer.Serialize(role),

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error activating role {RoleId}",
                id);

            throw;
        }
    }

    public async Task DeactivateAsync(int id)
    {
        _logger.LogInformation(
            "Deactivating role {RoleId}",
            id);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                id);

            throw new NotFoundException(
                "Role not found.");
        }

        if (role.IsSystemRole)
        {
            throw new BusinessRuleException(
                "System role cannot be deactivated.");
        }

        if (!role.IsActive)
        {
            throw new BusinessRuleException(
                "Role is already inactive.");
        }

        var userCount =
            await _unitOfWork.Roles.CountUsersAsync(id);

        if (userCount > 0)
        {
            throw new BusinessRuleException(
                "Cannot deactivate role assigned to users.");
        }

        var oldValues =
            JsonSerializer.Serialize(role);

        role.IsActive = false;

        try
        {
            await _unitOfWork.Roles.UpdateAsync(role);

            _logger.LogInformation(
                "Role deactivated successfully. Id={RoleId}",
                id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Deactivated",
                message: $"Role '{role.Name}' has been deactivated.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Deactivated",
                description: $"Role '{role.Name}' deactivated.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit Log

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Deactivate",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues = oldValues,

                    NewValues = JsonSerializer.Serialize(role),

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error deactivating role {RoleId}",
                id);

            throw;
        }
    }

    public async Task AssignPermissionsAsync(
    int roleId,
    AssignPermissionsDto dto)
    {
        _logger.LogInformation(
            "Assigning permissions to Role {RoleId}",
            roleId);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
        {
            _logger.LogWarning(
                "Role {RoleId} not found.",
                roleId);

            throw new NotFoundException(
                "Role not found.");
        }

        if (!role.IsActive)
        {
            throw new BusinessRuleException(
                "Cannot assign permissions to inactive role.");
        }

        dto.PermissionIds = dto.PermissionIds
            .Distinct()
            .ToList();

        await ValidatePermissionsAsync(
            dto.PermissionIds);

        if (role.IsSystemRole &&
            role.Name == "Super Admin")
        {
            throw new BusinessRuleException(
                "Permissions of Super Admin cannot be modified.");
        }

        var oldPermissions =
            await GetPermissionsAsync(roleId);

        try
        {
            await _unitOfWork.Roles.AssignPermissionsAsync(
                roleId,
                dto.PermissionIds);

            _logger.LogInformation(
                "{Count} permissions assigned to role {RoleId}",
                dto.PermissionIds.Count,
                roleId);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Permissions Updated",
                message:
                    $"Permissions updated for role '{role.Name}'.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Permissions Updated",
                description:
                    $"Permissions updated for role '{role.Name}'.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Assign Permissions",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues =
                        JsonSerializer.Serialize(oldPermissions),

                    NewValues =
                        JsonSerializer.Serialize(dto.PermissionIds),

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error assigning permissions to role {RoleId}",
                roleId);

            throw;
        }
    }

    public async Task<RoleDto> CloneAsync(
    int roleId,
    string newRoleName)
    {
        _logger.LogInformation(
            "Cloning role {RoleId}",
            roleId);

        if (string.IsNullOrWhiteSpace(newRoleName))
        {
            throw new BusinessRuleException(
                "Role name is required.");
        }

        if (await _unitOfWork.Roles.ExistsAsync(newRoleName))
        {
            throw new ConflictException(
                "Role already exists.");
        }

        var sourceRole =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (sourceRole == null)
        {
            throw new NotFoundException(
                "Role not found.");
        }

        try
        {
            var clonedRole =
                await _unitOfWork.Roles.CloneRoleAsync(
                    roleId,
                    newRoleName);

            _logger.LogInformation(
                "Role cloned successfully. New Role Id={RoleId}",
                clonedRole.Id);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Role Cloned",
                message:
                    $"Role '{sourceRole.Name}' cloned as '{clonedRole.Name}'.",
                entityId: clonedRole.Id,
                actionUrl: $"/roles/{clonedRole.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Cloned",
                description:
                    $"Role '{sourceRole.Name}' cloned as '{clonedRole.Name}'.",
                entityId: clonedRole.Id,
                entityName: clonedRole.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Clone",

                    EntityName = "Role",

                    EntityId = clonedRole.Id,

                    PerformedBy = "System",

                    OldValues =
                        JsonSerializer.Serialize(sourceRole),

                    NewValues =
                        JsonSerializer.Serialize(clonedRole),

                    CreatedOn = DateTime.UtcNow
                });

            return _mapper.Map<RoleDto>(clonedRole);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error cloning role {RoleId}",
                roleId);

            throw;
        }
    }

    public async Task AssignUsersAsync(
    int roleId,
    AssignUsersToRoleDto dto)
    {
        _logger.LogInformation(
            "Assigning users to role {RoleId}",
            roleId);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
        {
            throw new NotFoundException(
                "Role not found.");
        }

        if (!role.IsActive)
        {
            throw new BusinessRuleException(
                "Cannot assign users to inactive role.");
        }

        dto.UserIds = dto.UserIds
            .Distinct()
            .ToList();

        try
        {
            await _unitOfWork.Roles.AssignUsersAsync(
                roleId,
                dto.UserIds);

            _logger.LogInformation(
                "{Count} users assigned to role {RoleId}",
                dto.UserIds.Count,
                roleId);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Users Assigned",
                message:
                    $"{dto.UserIds.Count} users assigned to role '{role.Name}'.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Users Assigned",
                description:
                    $"{dto.UserIds.Count} users assigned to role '{role.Name}'.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Assign Users",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    NewValues =
                        JsonSerializer.Serialize(dto.UserIds),

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error assigning users to role {RoleId}",
                roleId);

            throw;
        }
    }

    public async Task<List<UserDto>> GetUsersAsync(
    int roleId)
    {
        _logger.LogInformation(
            "Fetching users for role {RoleId}",
            roleId);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
        {
            throw new NotFoundException(
                "Role not found.");
        }

        var users =
            await _unitOfWork.Roles.GetUsersAsync(roleId);

        _logger.LogInformation(
            "{Count} users found.",
            users.Count);

        return _mapper.Map<List<UserDto>>(users);
    }

    public async Task RemoveUserAsync(
    int roleId,
    int userId)
    {
        _logger.LogInformation(
            "Removing user {UserId} from role {RoleId}",
            userId,
            roleId);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
        {
            throw new NotFoundException(
                "Role not found.");
        }

        try
        {
            await _unitOfWork.Roles.RemoveUserAsync(
                roleId,
                userId);

            _logger.LogInformation(
                "User removed successfully.");

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "User Removed",
                message:
                    $"User removed from role '{role.Name}'.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "User Removed",
                description:
                    $"User {userId} removed from role '{role.Name}'.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Remove User",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues = $"User Id : {userId}",

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error removing user from role.");

            throw;
        }
    }


    public async Task SavePermissionMatrixAsync(
    int roleId,
    UpdatePermissionMatrixDto dto)
    {
        _logger.LogInformation(
            "Updating Permission Matrix for Role {RoleId}",
            roleId);

        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
        {
            throw new NotFoundException(
                "Role not found.");
        }

        if (!role.IsActive)
        {
            throw new BusinessRuleException(
                "Inactive role cannot be modified.");
        }

        dto.PermissionIds = dto.PermissionIds
            .Distinct()
            .ToList();

        await ValidatePermissionsAsync(
            dto.PermissionIds);

        if (role.IsSystemRole &&
            role.Name == "Super Admin")
        {
            var allPermissionIds =
                (await _unitOfWork.Permissions.GetAllAsync())
                    .Select(x => x.Id)
                    .OrderBy(x => x)
                    .ToList();

            var selected =
                dto.PermissionIds
                    .OrderBy(x => x)
                    .ToList();

            if (!allPermissionIds.SequenceEqual(selected))
            {
                throw new BusinessRuleException(
                    "Super Admin must always have every permission.");
            }
        }

        var oldPermissions =
            await GetPermissionsAsync(roleId);

        try
        {
            await _unitOfWork.Roles.SavePermissionMatrixAsync(
                roleId,
                dto.PermissionIds);

            _logger.LogInformation(
                "Permission Matrix updated successfully for Role {RoleId}",
                roleId);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "Role",
                title: "Permission Matrix Updated",
                message:
                    $"Permission matrix updated for role '{role.Name}'.",
                entityId: role.Id,
                actionUrl: $"/roles/{role.Id}");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "Role",
                action: "Permission Matrix Updated",
                description:
                    $"Permission matrix updated for role '{role.Name}'.",
                entityId: role.Id,
                entityName: role.Name,
                entityType: "Role",
                performedBy: "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Permission Matrix Updated",

                    EntityName = "Role",

                    EntityId = role.Id,

                    PerformedBy = "System",

                    OldValues =
                        JsonSerializer.Serialize(oldPermissions),

                    NewValues =
                        JsonSerializer.Serialize(dto.PermissionIds),

                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error updating Permission Matrix for Role {RoleId}",
                roleId);

            throw;
        }
    }

    private async Task ValidatePermissionsAsync(
    List<int> permissionIds)
    {
        permissionIds = permissionIds
            .Distinct()
            .ToList();

        var validation =
            await _permissionValidationService
                .ValidateAsync(permissionIds);

        if (!validation.IsValid)
        {
            _logger.LogWarning(
                "Permission validation failed.");

            throw new BusinessRuleException(
                string.Join(
                    Environment.NewLine,
                    validation.Errors));
        }
    }

    public async Task<List<RoleDto>> SearchAsync(RoleFilterDto filter)
    {
        _logger.LogInformation("Searching roles.");

        var roles = await _unitOfWork.Roles.SearchAsync(filter);

        var result = new List<RoleDto>();

        foreach (var role in roles)
        {
            var dto = _mapper.Map<RoleDto>(role);

            dto.UserCount =
                await _unitOfWork.Roles.CountUsersAsync(role.Id);

            dto.PermissionCount =
                await _unitOfWork.Roles.CountPermissionsAsync(role.Id);

            result.Add(dto);
        }

        _logger.LogInformation(
            "{Count} roles found.",
            result.Count);

        return result;
    }

    public async Task<List<string>> GetPermissionsAsync(int roleId)
    {
        var permissions =
            await _unitOfWork.Roles.GetPermissionsAsync(roleId);

        return permissions
            .OrderBy(x => x.Module)
            .ThenBy(x => x.Name)
            .Select(x => x.Code)
            .ToList();
    }

    public async Task<RoleStatisticsDto> GetStatisticsAsync()
    {
        return await _unitOfWork.Roles.GetStatisticsAsync();
    }

    public async Task<List<RoleDto>> GetActiveRolesAsync()
    {
        var roles =
            await _unitOfWork.Roles.GetActiveRolesAsync();

        return _mapper.Map<List<RoleDto>>(roles);
    }


    public async Task<List<RoleLookupDto>> GetLookupAsync()
    {
        var roles =
            await _unitOfWork.Roles.GetActiveRolesAsync();

        return _mapper.Map<List<RoleLookupDto>>(roles);
    }

    public async Task<bool> ExistsAsync(
    string roleName,
    int? excludeId = null)
    {
        return await _unitOfWork.Roles.ExistsAsync(
            roleName,
            excludeId);
    }


    public async Task<List<PermissionGroupDto>> GetPermissionMatrixAsync(
    int roleId)
    {
        var role =
            await _unitOfWork.Roles.GetForPermissionMatrixAsync(roleId);

        if (role == null)
            throw new NotFoundException("Role not found.");

        var allPermissions =
            await _unitOfWork.Permissions.GetAllAsync();

        var assigned =
            role.RolePermissions
                .Select(x => x.PermissionId)
                .ToHashSet();

        return allPermissions
            .GroupBy(x => x.Module)
            .OrderBy(x => x.Key)
            .Select(module => new PermissionGroupDto
            {
                Module = module.Key,

                Permissions = module
                    .OrderBy(x => x.Name)
                    .Select(permission => new PermissionMatrixItemDto
                    {
                        PermissionId = permission.Id,

                        PermissionName = permission.Code,

                        DisplayName = permission.Name,

                        Assigned = assigned.Contains(permission.Id)
                    })
                    .ToList()
            })
            .ToList();
    }

}