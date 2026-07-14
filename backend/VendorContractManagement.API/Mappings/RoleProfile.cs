using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Permission;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Mappings;

public class RoleProfile : Profile
{
    public RoleProfile()
    {
        CreateMap<Role, RoleDto>()
            .ForMember(
                d => d.UserCount,
                o => o.MapFrom(s => s.UserRoles.Count))

            .ForMember(
                d => d.PermissionCount,
                o => o.MapFrom(s => s.RolePermissions.Count));

        CreateMap<CreateRoleDto, Role>();

        CreateMap<UpdateRoleDto, Role>();

        CreateMap<User, UserDto>();

        CreateMap<Permission, PermissionDto>();
    }
}