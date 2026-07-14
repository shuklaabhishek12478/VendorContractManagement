using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.DTOs.Permission;
using VendorContractManagement.Application.DTOs.Role;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vendor, VendorDto>().ReverseMap();

            CreateMap<CreateVendorDto, Vendor>();

            CreateMap<UpdateVendorDto, Vendor>();

            CreateMap<AuditLog, AuditLogDto>().ReverseMap();

            CreateMap<Document, DocumentDto>().ReverseMap();

            CreateMap<Contract, ContractDto>();

            CreateMap<CreateContractDto, Contract>();

            CreateMap<UpdateContractDto, Contract>();

            CreateMap<User, UserDto>()
    .ForMember(
        dest => dest.Roles,
        opt => opt.MapFrom(src =>
            src.UserRoles
                .Where(x => x.Role != null)
                .Select(x => x.Role.Name)
                .ToList()));

            CreateMap<CreateUserDto, User>();

            CreateMap<RecentActivity, RecentActivityDto>();

            CreateMap<VendorDocument, VendorDocumentDto>();

            CreateMap<Expenditure, ExpenditureDto>();

            CreateMap<CreateExpenditureDto, Expenditure>();

            CreateMap<UpdateExpenditureDto, Expenditure>();

            CreateMap<VendorDocumentDto, VendorDocument>();

            CreateMap<Role, RoleDto>();

            CreateMap<CreateRoleDto, Role>()

                .ForMember(x => x.Id,
                    opt => opt.Ignore())

                .ForMember(x => x.UserRoles,
                    opt => opt.Ignore())

                .ForMember(x => x.RolePermissions,
                    opt => opt.Ignore())

                .ForMember(x => x.IsSystemRole,
                    opt => opt.Ignore())

                .ForMember(x => x.CreatedOn,
                    opt => opt.Ignore())

                .ForMember(x => x.UpdatedOn,
                    opt => opt.Ignore())


                .AfterMap((src, dest) =>
                {
                    dest.Name = src.Name.Trim();

                    dest.Description = src.Description?.Trim() ?? "";
                });

            CreateMap<UpdateRoleDto, Role>()

                .ForMember(x => x.Id,
                    opt => opt.Ignore())

                .ForMember(x => x.UserRoles,
                    opt => opt.Ignore())

                .ForMember(x => x.RolePermissions,
                    opt => opt.Ignore())

                .ForMember(x => x.IsSystemRole,
                    opt => opt.Ignore())

                .ForMember(x => x.CreatedOn,
                    opt => opt.Ignore())

                .ForMember(x => x.UpdatedOn,
                    opt => opt.Ignore())

                .AfterMap((src, dest) =>
                {
                    dest.Name = src.Name.Trim();

                    dest.Description = src.Description?.Trim() ?? "";

                    dest.Color = src.Color?.Trim() ?? "";

                    dest.Icon = src.Icon?.Trim() ?? "";
                });
            CreateMap<Permission, PermissionDto>();
        }
    }
}