using AutoMapper;
using BCrypt.Net;
using VendorContractManagement.Application.DTOs;
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
                UserRoles = new List<UserRole>(),
                VendorId = dto.VendorId,
                IsActive = true
            };

            await _userRepository.AddAsync(user);

            await _unitOfWork.SaveChangesAsync();
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
    }
}