using AutoMapper;
using ClosedXML.Excel;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;
using VendorContractManagement.Application.Interfaces;
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
        public UserService(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IRoleRepository roleRepository,
            IRecentActivityService recentActivityService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _recentActivityService = recentActivityService;
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDetailsDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                return null;

            return _mapper.Map<UserDetailsDto>(user);
        }

        public async Task CreateAsync(CreateUserDto dto)
        {
            var existingUser =
                await _userRepository.GetByEmailAsync(dto.Email);

            if (existingUser != null)
                throw new Exception("User already exists");

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

            await _userRepository.AddAsync(user);

            _userRepository.Update(user);

            await _recentActivityService.LogAsync(
                module: "User",
                action: "Activate",
                description: $"User '{user.FullName}' activated.",
                entityId: user.Id,
                entityName: user.FullName,
                entityType: "User",
                performedBy: "Admin"
            );


            await _unitOfWork.SaveChangesAsync();

            

            /*  if (dto.RoleIds.Any())
              {
                  var roles = dto.RoleIds
                      .Distinct()
                      .Select(roleId => new UserRole
                      {
                          UserId = user.Id,
                          RoleId = roleId
                      })
                      .ToList();

                  await _userRepository.AddUserRolesAsync(roles);

                  await _unitOfWork.SaveChangesAsync();
              }*/
        }
        public async Task ActivateAsync(int id)
        {
            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.IsActive = true;

            _userRepository.Update(user);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "User",
    action: "Activate",
    description: $"User '{user.FullName}' activated.",
    entityId: user.Id,
    entityName: user.FullName,
    entityType: "User",
    performedBy: "Admin"
);
        }

        public async Task DeactivateAsync(int id)
        {
            var user =
                await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.IsActive = false;

            _userRepository.Update(user);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "User",
    action: "Deactivate",
    description: $"User '{user.FullName}' deactivated.",
    entityId: user.Id,
    entityName: user.FullName,
    entityType: "User",
    performedBy: "Admin"
);
        }

        public async Task UpdateAsync(int id, UpdateUserDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.FullName = dto.FullName;
            user.VendorId = dto.VendorId;
            user.IsActive = dto.IsActive;

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
            await _recentActivityService.LogAsync(
module: "User",
action: "Update",
description: $"User '{user.FullName}' updated.",
entityId: user.Id,
entityName: user.FullName,
entityType: "User",
performedBy: "Admin"
);
            await _unitOfWork.SaveChangesAsync();
        }
        
         

        public async Task DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.IsDeleted = true;

            _userRepository.Update(user);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "User",
    action: "Delete",
    description: $"User '{user.FullName}' deleted.",
    entityId: user.Id,
    entityName: user.FullName,
    entityType: "User",
    performedBy: "Admin"
);
        }

        public async Task ResetPasswordAsync(
    int id,
    string newPassword)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(newPassword);

            _userRepository.Update(user);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "User",
    action: "Reset Password",
    description: $"Password reset for '{user.FullName}'.",
    entityId: user.Id,
    entityName: user.FullName,
    entityType: "User",
    performedBy: "Admin"
);
        }


        public async Task AssignRolesAsync(
    int id,
    List<int> roleIds)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            var existingRoles =
                await _userRepository.GetUserRolesAsync(id);

            await _userRepository.RemoveUserRolesAsync(existingRoles);

            var newRoles = roleIds
                .Distinct()
                .Select(roleId => new UserRole
                {
                    UserId = id,
                    RoleId = roleId
                })
                .ToList();

            await _userRepository.AddUserRolesAsync(newRoles);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "User",
    action: "Assign Roles",
    description: $"Roles updated for '{user.FullName}'.",
    entityId: user.Id,
    entityName: user.FullName,
    entityType: "User",
    performedBy: "Admin"
);
        }

        public async Task<PagedUserResponseDto> GetPagedAsync(
    UserQueryDto query)
        {
            var (items, totalCount) =
                await _userRepository.GetPagedAsync(query);

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
            var users = await _userRepository.GetAllAsync();

            using var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Users");

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
                worksheet.Cell(row, 4).Value = user.Vendor?.VendorName ?? "";

                worksheet.Cell(row, 5).Value =
                    string.Join(",",
                        user.UserRoles.Select(x => x.Role.Name));

                worksheet.Cell(row, 6).Value =
                    user.IsActive ? "Active" : "Inactive";

                worksheet.Cell(row, 7).Value =
                    user.CreatedOn;

                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }

        public async Task ImportAsync(Stream stream)
        {
            using var workbook = new XLWorkbook(stream);

            var worksheet = workbook.Worksheet(1);

            var rows = worksheet.RowsUsed().Skip(1);

            foreach (var row in rows)
            {
                var fullName = row.Cell(2).GetString().Trim();
                var email = row.Cell(3).GetString().Trim();

                if (string.IsNullOrWhiteSpace(email))
                    continue;

                var exists = await _userRepository.GetByEmailAsync(email);

                if (exists != null)
                    continue;

                var user = new User
                {
                    FullName = fullName,
                    Email = email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password@123"),
                    IsActive = true
                };

                await _userRepository.AddAsync(user);
            }

            await _userRepository.SaveChangesAsync();

            Console.WriteLine("Saving...");

            await _userRepository.SaveChangesAsync();

            Console.WriteLine("Saved");
        }
    }
}