using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vendor, VendorDto>();

            CreateMap<CreateVendorDto, Vendor>();

            CreateMap<AuditLog, AuditLogDto>().ReverseMap();

            CreateMap<Document, DocumentDto>().ReverseMap();
            CreateMap<Contract, ContractDto>().ReverseMap();

            CreateMap<User, UserDto>();

            CreateMap<CreateUserDto, User>();

            CreateMap<Contract, ContractDto>();

            CreateMap<RecentActivity, RecentActivityDto>();
        }
    }
}