using AutoMapper;
using VendorContractManagement.Application.DTOs.Permission;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public PermissionService(
            IPermissionRepository permissionRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _permissionRepository = permissionRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<List<PermissionDto>> GetAllAsync()
        {
            var permissions =
                await _permissionRepository.GetAllAsync();

            return _mapper.Map<List<PermissionDto>>(permissions);
        }

        public async Task<bool> HasPermissionAsync(
     int userId,
     string permission)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                return false;

            Console.WriteLine("========== USER ==========");
            Console.WriteLine($"User Id = {user.Id}");

            foreach (var userRole in user.UserRoles)
            {
                Console.WriteLine($"Role = {userRole.Role?.Name}");

                if (userRole.Role?.RolePermissions != null)
                {
                    foreach (var rp in userRole.Role.RolePermissions)
                    {
                        Console.WriteLine(
                            $"Permission = {rp.Permission?.Code}");
                    }
                }
            }

            return user.UserRoles
                .SelectMany(x => x.Role.RolePermissions)
                .Any(x => x.Permission.Code == permission);
        }

        public async Task<PermissionDto?> GetByIdAsync(int id)
        {
            var permission =
                await _permissionRepository.GetByIdAsync(id);

            if (permission == null)
                return null;

            return _mapper.Map<PermissionDto>(permission);
        }

        public async Task<List<string>> GetModulesAsync()
        {
            return await _permissionRepository.GetModulesAsync();
        }

        public async Task<List<PermissionDto>> GetByModuleAsync(string module)
        {
            var permissions =
                await _permissionRepository.GetByModuleAsync(module);

            return _mapper.Map<List<PermissionDto>>(permissions);
        }

        public async Task<Dictionary<string, List<PermissionDto>>> GetGroupedAsync()
        {
            var permissions =
                await _permissionRepository.GetAllAsync();

            return permissions
                .GroupBy(x => x.Module)
                .ToDictionary(
                    g => g.Key,
                    g => _mapper.Map<List<PermissionDto>>(g.ToList()));
        }

        public async Task<List<PermissionDto>> GetByIdsAsync(
    List<int> permissionIds)
        {
            var permissions =
                await _permissionRepository.GetByIdsAsync(permissionIds);

            return _mapper.Map<List<PermissionDto>>(permissions);
        }
    }
}