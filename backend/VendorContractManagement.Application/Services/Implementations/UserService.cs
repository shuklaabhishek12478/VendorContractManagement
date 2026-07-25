
using AutoMapper;
using ClosedXML.Excel;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;
using VendorContractManagement.Application.Exceptions;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Helpers;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleRepository;
        private readonly IRecentActivityService _recentActivityService;
        private readonly IAuditLogService _auditLogService;
        private readonly NotificationHelper _notificationHelper;
        private readonly ILogger<UserService> _logger;
        private readonly IUserContextService _userContext;
        public UserService(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IRoleRepository roleRepository,
            IRecentActivityService recentActivityService,
            IAuditLogService auditLogService,
            NotificationHelper notificationHelper,
            ILogger<UserService> logger,
            IUserContextService userContext)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _roleRepository = roleRepository;
            _recentActivityService = recentActivityService;
            _auditLogService = auditLogService;
            _notificationHelper = notificationHelper;
            _userContext = userContext;
            _logger = logger;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            _logger.LogInformation("Fetching all users.");

            var users =
                await _userRepository.GetAllAsync();

            _logger.LogInformation(
                "{Count} users fetched successfully.",
                users.Count());

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDetailsDto?> GetByIdAsync(int id)
        {
            _logger.LogInformation(
                "Fetching user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            _logger.LogInformation(
                "User {UserId} loaded successfully.",
                id);

            return _mapper.Map<UserDetailsDto>(user);
        }

        public async Task CreateAsync(CreateUserDto dto)
        {
            _logger.LogInformation(
                "Creating user {Email}",
                dto.Email);

            var existingUser =
                await _userRepository.GetByEmailAsync(dto.Email);

            if (existingUser != null)
            {
                _logger.LogWarning(
                    "Duplicate user creation attempted for {Email}",
                    dto.Email);

                throw new ConflictException(
                    "User already exists.");
            }

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                VendorId = dto.VendorId,
                IsActive = true,

                UserRoles = dto.RoleIds
                    .Distinct()
                    .Select(roleId => new UserRole
                    {
                        RoleId = roleId
                    })
                    .ToList()
            };

            try
            {
                await _userRepository.AddAsync(user);

                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation(
                    "User created successfully. Id={UserId}",
                    user.Id);

                // Notification

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "User Created",
                    message: $"User '{user.FullName}' has been created.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                // Recent Activity

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Created",
                    description:
                        $"User '{user.FullName}' created.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                // Audit Log

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Create",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = null,
                        NewValues = JsonSerializer.Serialize(user),
                        CreatedOn = DateTime.UtcNow
                    });

                _logger.LogInformation(
                    "User creation completed successfully. Id={UserId}",
                    user.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while creating user {Email}",
                    dto.Email);

                throw;
            }
        }

        public async Task ActivateAsync(int id)
        {
            _logger.LogInformation(
                "Activating user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            if (user.IsActive)
            {
                throw new BusinessRuleException(
                    "User is already active.");
            }

            var oldValues =
                JsonSerializer.Serialize(user);

            user.IsActive = true;

            try
            {
                _userRepository.Update(user);

                await _unitOfWork.SaveChangesAsync();

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "User Activated",
                    message: $"User '{user.FullName}' has been activated.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Activated",
                    description:
                        $"User '{user.FullName}' activated.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Activate",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = oldValues,
                        NewValues = JsonSerializer.Serialize(user),
                        CreatedOn = DateTime.UtcNow
                    });

                _logger.LogInformation(
                    "User activated successfully. Id={UserId}",
                    user.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error activating user {UserId}",
                    id);

                throw;
            }
        }

        public async Task DeactivateAsync(int id)
        {
            _logger.LogInformation(
                "Deactivating user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            if (!user.IsActive)
            {
                throw new BusinessRuleException(
                    "User is already inactive.");
            }

            var oldValues =
                JsonSerializer.Serialize(user);

            user.IsActive = false;

            try
            {
                _userRepository.Update(user);

                await _unitOfWork.SaveChangesAsync();

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "User Deactivated",
                    message: $"User '{user.FullName}' has been deactivated.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Deactivated",
                    description:
                        $"User '{user.FullName}' deactivated.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Deactivate",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = oldValues,
                        NewValues = JsonSerializer.Serialize(user),
                        CreatedOn = DateTime.UtcNow
                    });

                _logger.LogInformation(
                    "User deactivated successfully. Id={UserId}",
                    user.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error deactivating user {UserId}",
                    id);

                throw;
            }
        }

        public async Task UpdateAsync(
            int id,
            UpdateUserDto dto)
        {
            _logger.LogInformation(
                "Updating user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            var oldValues =
                JsonSerializer.Serialize(user);

            user.FullName = dto.FullName;
            user.VendorId = dto.VendorId;
            user.IsActive = dto.IsActive;

            try
            {
                _userRepository.Update(user);

                var existingRoles =
                    await _userRepository.GetUserRolesAsync(id);

                await _userRepository.RemoveUserRolesAsync(existingRoles);

                if (dto.RoleIds.Any())
                {
                    var newRoles = dto.RoleIds
                        .Distinct()
                        .Select(roleId => new UserRole
                        {
                            UserId = id,
                            RoleId = roleId
                        })
                        .ToList();

                    await _userRepository.AddUserRolesAsync(newRoles);
                }

                await _unitOfWork.SaveChangesAsync();

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "User Updated",
                    message: $"User '{user.FullName}' has been updated.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Updated",
                    description:
                        $"User '{user.FullName}' updated.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Update",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = oldValues,
                        NewValues = JsonSerializer.Serialize(user),
                        CreatedOn = DateTime.UtcNow
                    });

                _logger.LogInformation(
                    "User updated successfully. Id={UserId}",
                    user.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error updating user {UserId}",
                    id);

                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            _logger.LogInformation(
                "Deleting user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            var oldValues =
                JsonSerializer.Serialize(user);

            try
            {
                user.IsDeleted = true;

                _userRepository.Update(user);

                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation(
                    "User deleted successfully. Id={UserId}",
                    user.Id);

                // Notification

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "User Deleted",
                    message: $"User '{user.FullName}' has been deleted.",
                    entityId: user.Id,
                    actionUrl: "/users");

                // Recent Activity

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Deleted",
                    description:
                        $"User '{user.FullName}' deleted.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                // Audit Log

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Delete",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = oldValues,
                        NewValues = null,
                        CreatedOn = DateTime.UtcNow
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error deleting user {UserId}",
                    id);

                throw;
            }
        }

        public async Task ResetPasswordAsync(
            int id,
            string newPassword)
        {
            _logger.LogInformation(
                "Resetting password for user {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            var oldValues =
                JsonSerializer.Serialize(new
                {
                    user.PasswordHash
                });

            try
            {
                user.PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(newPassword);

                _userRepository.Update(user);

                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation(
                    "Password reset successfully for User {UserId}",
                    user.Id);

                // Notification

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "Password Reset",
                    message:
                        $"Password has been reset for '{user.FullName}'.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                // Recent Activity

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Password Reset",
                    description:
                        $"Password reset for '{user.FullName}'.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                // Audit

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Reset Password",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = oldValues,
                        NewValues = "Password Changed",
                        CreatedOn = DateTime.UtcNow
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error resetting password for User {UserId}",
                    id);

                throw;
            }
        }

        public async Task AssignRolesAsync(
            int id,
            List<int> roleIds)
        {
            _logger.LogInformation(
                "Assigning roles to User {UserId}",
                id);

            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                _logger.LogWarning(
                    "User {UserId} not found.",
                    id);

                throw new NotFoundException(
                    "User not found.");
            }

            roleIds = roleIds
                .Distinct()
                .ToList();

            var oldRoles =
                (await _userRepository.GetUserRolesAsync(id))
                .Select(x => x.RoleId)
                .ToList();

            try
            {
                var existingRoles =
                    await _userRepository.GetUserRolesAsync(id);

                await _userRepository.RemoveUserRolesAsync(existingRoles);

                if (roleIds.Any())
                {
                    var newRoles =
                        roleIds.Select(roleId => new UserRole
                        {
                            UserId = id,
                            RoleId = roleId
                        }).ToList();

                    await _userRepository.AddUserRolesAsync(newRoles);
                }

                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation(
                    "{Count} roles assigned to User {UserId}",
                    roleIds.Count,
                    id);

                // Notification

                await _notificationHelper.CreateAsync(
                    module: "User",
                    title: "Roles Updated",
                    message:
                        $"Roles updated for '{user.FullName}'.",
                    entityId: user.Id,
                    actionUrl: $"/users/{user.Id}");

                // Recent Activity

                await _recentActivityService.LogAsync(
                    module: "User",
                    action: "Roles Updated",
                    description:
                        $"Roles updated for '{user.FullName}'.",
                    entityId: user.Id,
                    entityName: user.FullName,
                    entityType: "User",
                    performedBy: _userContext.UserId?.ToString() ?? "System");

                // Audit

                await _auditLogService.LogAsync(
                    new AuditLog
                    {
                        Action = "Assign Roles",
                        EntityName = "User",
                        EntityId = user.Id,
                        PerformedBy = "Admin",
                        OldValues = JsonSerializer.Serialize(oldRoles),
                        NewValues = JsonSerializer.Serialize(roleIds),
                        CreatedOn = DateTime.UtcNow
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error assigning roles to User {UserId}",
                    id);

                throw;
            }
        }

        public async Task<PagedUserResponseDto> GetPagedAsync(
    UserQueryDto query)
        {
            _logger.LogInformation(
                "Fetching paged users.");

            var (items, totalCount) =
                await _userRepository.GetPagedAsync(query);

            _logger.LogInformation(
                "{Count} users fetched.",
                totalCount);

            return new PagedUserResponseDto
            {
                Items = _mapper.Map<List<UserDto>>(items),
                TotalCount = totalCount,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize
            };
        }

        public async Task<byte[]> ExportAsync()
        {
            _logger.LogInformation(
                "Exporting users to Excel.");

            var users =
                await _userRepository.GetAllAsync();

            using var workbook = new XLWorkbook();

            var worksheet =
                workbook.Worksheets.Add("Users");

            worksheet.Cell(1, 1).Value = "Id";
            worksheet.Cell(1, 2).Value = "Full Name";
            worksheet.Cell(1, 3).Value = "Email";
            worksheet.Cell(1, 4).Value = "Vendor";
            worksheet.Cell(1, 5).Value = "Roles";
            worksheet.Cell(1, 6).Value = "Status";
            worksheet.Cell(1, 7).Value = "Created On";

            var row = 2;

            foreach (var user in users)
            {
                worksheet.Cell(row, 1).Value = user.Id;
                worksheet.Cell(row, 2).Value = user.FullName;
                worksheet.Cell(row, 3).Value = user.Email;
                worksheet.Cell(row, 4).Value =
                    user.Vendor?.VendorName ?? "";

                worksheet.Cell(row, 5).Value =
                    string.Join(", ",
                        user.UserRoles.Select(x => x.Role.Name));

                worksheet.Cell(row, 6).Value =
                    user.IsActive
                        ? "Active"
                        : "Inactive";

                worksheet.Cell(row, 7).Value =
                    user.CreatedOn;

                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            _logger.LogInformation(
                "Users exported successfully. Count={Count}",
                users.Count());

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "User",
                action: "Export",
                description:
                    $"{users.Count()} users exported to Excel.",
                entityName: "Users",
                entityType: "User",
                performedBy: _userContext.UserId?.ToString() ?? "System");

            // Notification

            await _notificationHelper.CreateAsync(
                module: "User",
                title: "Users Exported",
                message:
                    $"{users.Count()} users exported successfully.",
                actionUrl: "/users");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Export",
                    EntityName = "User",
                    PerformedBy = "Admin",
                    NewValues = $"{users.Count()} records exported",
                    CreatedOn = DateTime.UtcNow
                });

            return stream.ToArray();
        }

        public async Task ImportAsync(Stream stream)
        {
            _logger.LogInformation(
                "Importing users from Excel.");

            using var workbook =
                new XLWorkbook(stream);

            var worksheet =
                workbook.Worksheet(1);

            var rows =
                worksheet.RowsUsed().Skip(1);

            var importedCount = 0;

            foreach (var row in rows)
            {
                var fullName =
                    row.Cell(2).GetString().Trim();

                var email =
                    row.Cell(3).GetString().Trim();

                if (string.IsNullOrWhiteSpace(email))
                    continue;

                var exists =
                    await _userRepository.GetByEmailAsync(email);

                if (exists != null)
                    continue;

                var user = new User
                {
                    FullName = fullName,
                    Email = email,
                    PasswordHash =
                        BCrypt.Net.BCrypt.HashPassword("Password@123"),
                    IsActive = true
                };

                await _userRepository.AddAsync(user);

                importedCount++;
            }

            await _unitOfWork.SaveChangesAsync();

            _logger.LogInformation(
                "{Count} users imported successfully.",
                importedCount);

            // Notification

            await _notificationHelper.CreateAsync(
                module: "User",
                title: "Users Imported",
                message:
                    $"{importedCount} users imported successfully.",
                actionUrl: "/users");

            // Recent Activity

            await _recentActivityService.LogAsync(
                module: "User",
                action: "Import",
                description:
                    $"{importedCount} users imported from Excel.",
                entityName: "Users",
                entityType: "User",
                performedBy: _userContext.UserId?.ToString() ?? "System");

            // Audit

            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Import",
                    EntityName = "User",
                    PerformedBy = "Admin",
                    NewValues = $"{importedCount} records imported",
                    CreatedOn = DateTime.UtcNow
                });
        }
    }
}