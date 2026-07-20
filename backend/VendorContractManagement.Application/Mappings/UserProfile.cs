using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        // Entity -> DTO
        CreateMap<User, UserDto>()
            .ForMember(
                dest => dest.Roles,
                opt => opt.MapFrom(src =>
                    src.UserRoles.Select(x => x.Role.Name).ToList()))
            .ForMember(
                dest => dest.VendorName,
                opt => opt.MapFrom(src =>
                    src.Vendor != null ? src.Vendor.VendorName : null));

        CreateMap<User, UserDetailsDto>()
            .ForMember(
                dest => dest.Roles,
                opt => opt.MapFrom(src =>
                    src.UserRoles.Select(x => x.Role.Name).ToList()))
            .ForMember(
                dest => dest.RoleIds,
                opt => opt.MapFrom(src =>
                    src.UserRoles.Select(x => x.RoleId).ToList()))
            .ForMember(
                dest => dest.VendorName,
                opt => opt.MapFrom(src =>
                    src.Vendor != null ? src.Vendor.VendorName : null));

        CreateMap<User, UserLookupDto>();

        // DTO -> Entity
        CreateMap<CreateUserDto, User>();

        CreateMap<UpdateUserDto, User>()
            .ForMember(
                dest => dest.Id,
                opt => opt.Ignore())
            .ForMember(
                dest => dest.Email,
                opt => opt.Ignore())
            .ForMember(
                dest => dest.PasswordHash,
                opt => opt.Ignore())
            .ForMember(
                dest => dest.UserRoles,
                opt => opt.Ignore());
    }
}