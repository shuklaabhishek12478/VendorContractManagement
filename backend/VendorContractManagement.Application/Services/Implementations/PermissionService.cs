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
            return await _permissionRepository
                .UserHasPermissionAsync(userId, permission);
        }
    }
}