using AutoMapper;
using Microsoft.Extensions.Logging;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Application.Exceptions;
using VendorContractManagement.Application.Interfaces;
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

    public RoleService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        ILogger<RoleService> logger,
        IAuditLogService auditLogService,
        IPermissionValidationService permissionValidationService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
        _auditLogService = auditLogService;
        _permissionValidationService = permissionValidationService;
    }

    public async Task<List<RoleDto>> GetAllAsync()
    {
        var roles = await _unitOfWork.Roles.GetAllAsync();

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

        return result;
    }

    public async Task<RoleDto?> GetByIdAsync(int id)
    {
        var role = await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
            return null;

        var dto = _mapper.Map<RoleDto>(role);

        dto.UserCount =
            await _unitOfWork.Roles.CountUsersAsync(id);

        dto.PermissionCount =
            await _unitOfWork.Roles.CountPermissionsAsync(id);

        return dto;
    }

    public async Task<RoleDto> CreateAsync(CreateRoleDto dto)
    {
        _logger.LogInformation("Creating role {RoleName}", dto.Name);

        if (await _unitOfWork.Roles.ExistsAsync(dto.Name))
        {
            _logger.LogWarning("Duplicate role creation attempted: {RoleName}", dto.Name);

            throw new ConflictException("Role already exists.");
        }

        var role = _mapper.Map<Role>(dto);

        role.IsSystemRole = false;

        var created = await _unitOfWork.Roles.AddAsync(role);

        _logger.LogInformation("Role created successfully. Id={RoleId}", created.Id);

        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Create",
            EntityName = "Role",
            EntityId = created.Id,
            PerformedBy = "System",
            NewValues = $"Role : {created.Name}",
            CreatedOn = DateTime.UtcNow
        });
        return _mapper.Map<RoleDto>(created);

    }

    public async Task<RoleDto> UpdateAsync(
    int id,
    UpdateRoleDto dto)
    {
        _logger.LogInformation("Updating role {RoleId}", id);
        var role = await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
            throw new NotFoundException("Role not found.");
        if (await _unitOfWork.Roles.ExistsAsync(dto.Name, id))
        {
            throw new ConflictException("Role name already exists.");
        }
        if (role.IsSystemRole &&
            role.Name != dto.Name)
        {
            throw new BusinessRuleException(
    "System role name cannot be changed.");
        }

        role.Name = dto.Name;
        role.Description = dto.Description;
        role.Color = dto.Color;
        role.Icon = dto.Icon;
        role.Priority = dto.Priority;
        role.IsActive = dto.IsActive;

        await _unitOfWork.Roles.UpdateAsync(role);

        
        _logger.LogInformation("Role updated successfully. Id={RoleId}", id);
       
        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Update",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = $"Role Updated : {role.Name}",
            CreatedOn = DateTime.UtcNow
        });
        return _mapper.Map<RoleDto>(role);
    }

    public async Task DeleteAsync(int id)
    {
        _logger.LogInformation("Deleting role {RoleId}", id);
        var role = await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
            throw new NotFoundException("Role not found.");

        if (role.IsSystemRole)
            throw new BusinessRuleException(
    "System role cannot be deleted.");
        await _unitOfWork.Roles.DeleteAsync(role);
        _logger.LogInformation("Role deleted successfully. Id={RoleId}", id);
        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Delete",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            OldValues = role.Name,
            CreatedOn = DateTime.UtcNow
        });

       
    }

    public async Task ActivateAsync(int id)
    {
        _logger.LogInformation("Activating role {RoleId}", id);
        var role = await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
            throw new NotFoundException("Role not found.");

        role.IsActive = true;

        await _unitOfWork.Roles.UpdateAsync(role);
        _logger.LogInformation("Role activated. Id={RoleId}", id);
        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Activate",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = role.Name,
            CreatedOn = DateTime.UtcNow
        });
    }

    public async Task DeactivateAsync(int id)
    {
        _logger.LogInformation("Deactivating role {RoleId}", id);
        var role = await _unitOfWork.Roles.GetByIdAsync(id);

        if (role == null)
            throw new NotFoundException("Role not found.");

        if (role.IsSystemRole)
            throw new BusinessRuleException(
    "System role cannot be deactivated.");
        
        role.IsActive = false;

        await _unitOfWork.Roles.UpdateAsync(role);
        _logger.LogInformation("Role deactivated. Id={RoleId}", id);
        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Deactivate",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = role.Name,
            CreatedOn = DateTime.UtcNow
        });
    }

    public async Task<List<RoleDto>> SearchAsync(RoleFilterDto filter)
    {
        _logger.LogInformation(
    "Searching roles");
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
    "{Count} roles found",
    result.Count);

        return result;
    }

    public async Task AssignPermissionsAsync(
    int roleId,
    AssignPermissionsDto dto)
    {
        _logger.LogInformation(
    "Assigning permissions to role {RoleId}",
    roleId);
        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
            throw new NotFoundException("Role not found.");

        if (!role.IsActive)
            throw new BusinessRuleException(
    "Cannot assign permissions to inactive role.");

        dto.PermissionIds = dto.PermissionIds
            .Distinct()
            .ToList();

        await _unitOfWork.Roles.AssignPermissionsAsync(
            roleId,
            dto.PermissionIds);
        _logger.LogInformation(
    "{Count} permissions assigned to role {RoleId}",
    dto.PermissionIds.Count,
    roleId);
        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Assign Permissions",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = $"{dto.PermissionIds.Count} Permissions Assigned",
            CreatedOn = DateTime.UtcNow
        });
    }

    public async Task<List<string>> GetPermissionsAsync(
    int roleId)
    {
        var permissions =
            await _unitOfWork.Roles.GetPermissionsAsync(roleId);

        return permissions

            .Select(x => x.Code)

            .OrderBy(x => x)

            .ToList();
    }

    public async Task<RoleDto> CloneAsync(
    int roleId,
    string newRoleName)
    {
        _logger.LogInformation(
    "Cloning role {RoleId}",
    roleId);
        if (await _unitOfWork.Roles.ExistsAsync(newRoleName))
        {
            throw new ConflictException("Role already exists.");
        }

        var role =
            await _unitOfWork.Roles.CloneRoleAsync(
                roleId,
                newRoleName);

        _logger.LogInformation(
    "Role cloned successfully as {RoleName}",
    role.Name);

        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Clone",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = $"Cloned As : {newRoleName}",
            CreatedOn = DateTime.UtcNow
        });

        return _mapper.Map<RoleDto>(role);

    }

    public async Task AssignUsersAsync(
    int roleId,
    AssignUsersToRoleDto dto)
    {
        _logger.LogInformation(
            "Assigning users to role {RoleId}",
            roleId);

        var role = await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
            throw new NotFoundException("Role not found.");

        if (!role.IsActive)
            throw new BusinessRuleException(
                "Cannot assign users to inactive role.");

        dto.UserIds = dto.UserIds
            .Distinct()
            .ToList();

        await _unitOfWork.Roles.AssignUsersAsync(
            roleId,
            dto.UserIds);

        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Assign Users",
            EntityName = "Role",
            EntityId = role.Id,
            PerformedBy = "System",
            NewValues = $"{dto.UserIds.Count} Users Assigned",
            CreatedOn = DateTime.UtcNow
        });

        _logger.LogInformation(
            "{Count} users assigned to role {RoleId}",
            dto.UserIds.Count,
            roleId);
    }

    public async Task<List<UserDto>> GetUsersAsync(
    int roleId)
    {
        var role =
            await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
            throw new NotFoundException("Role not found.");

        var users =
            await _unitOfWork.Roles.GetUsersAsync(roleId);

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

        var role = await _unitOfWork.Roles.GetByIdAsync(roleId);

        if (role == null)
            throw new NotFoundException("Role not found.");

        await _unitOfWork.Roles.RemoveUserAsync(
            roleId,
            userId);

        await _auditLogService.LogAsync(new AuditLog
        {
            Action = "Remove User",
            EntityName = "Role",
            EntityId = roleId,
            PerformedBy = "System",
            OldValues = $"UserId : {userId}",
            CreatedOn = DateTime.UtcNow
        });

        _logger.LogInformation(
            "User removed from role successfully.");
    }

    public async Task<RoleStatisticsDto> GetStatisticsAsync()
    {
        return await _unitOfWork.Roles.GetStatisticsAsync();
    }

    public async Task<List<RoleDto>> GetActiveRolesAsync()
    {
        var roles = await _unitOfWork.Roles.GetActiveRolesAsync();

        return _mapper.Map<List<RoleDto>>(roles);
    }

    public async Task<List<RoleLookupDto>> GetLookupAsync()
    {
        var roles = await _unitOfWork.Roles.GetActiveRolesAsync();

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
            await _unitOfWork.Roles
                .GetForPermissionMatrixAsync(roleId);

        if (role == null)
            throw new Exception("Role not found.");

        var allPermissions =
            await _unitOfWork.Permissions
                .GetAllAsync();

        var assignedPermissionIds =
            role.RolePermissions
                .Select(x => x.PermissionId)
                .ToHashSet();

        var result = allPermissions

            .GroupBy(x => x.Module)

            .Select(group => new PermissionGroupDto
            {
                Module = group.Key,

                Permissions = group

                    .OrderBy(x => x.Name)

                    .Select(permission => new PermissionMatrixItemDto
                    {
                        PermissionId = permission.Id,

                        PermissionName = permission.Code,

                        DisplayName = permission.Name,

                        Assigned =
                            assignedPermissionIds.Contains(
                                permission.Id)

                    })

                    .ToList()

            })

            .OrderBy(x => x.Module)

            .ToList();

        return result;
    }

    public async Task SavePermissionMatrixAsync(
    int roleId,
    UpdatePermissionMatrixDto dto)
    {
        var role =
            await _unitOfWork.Roles
                .GetByIdAsync(roleId);

        if (role == null)
            throw new Exception("Role not found.");

        dto.PermissionIds = dto.PermissionIds
    .Distinct()
    .ToList();

        var validation =
            await _permissionValidationService
                .ValidateAsync(dto.PermissionIds);

        if (!validation.IsValid)
        {
            throw new BusinessRuleException(
                string.Join(Environment.NewLine,
                    validation.Errors));
        }

        await _unitOfWork.Roles
            .SavePermissionMatrixAsync(
                roleId,
                dto.PermissionIds);

        await _unitOfWork.RecentActivities.AddAsync(
            new RecentActivity
            {
                Action = "Permission Matrix Updated",

                EntityName = role.Name,

                Description =
                    $"Permissions updated for role '{role.Name}'.",

                CreatedOn = DateTime.UtcNow
            });

        await _unitOfWork.SaveChangesAsync();
    }
}