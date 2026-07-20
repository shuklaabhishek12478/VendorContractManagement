using AutoMapper;
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

        public UserService(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            return _mapper.Map<UserDto>(user);
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
                IsActive = true
            };

            await _userRepository.AddAsync(user);

            await _unitOfWork.SaveChangesAsync();

            if (dto.RoleIds.Any())
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
            }
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
        }
    }
}