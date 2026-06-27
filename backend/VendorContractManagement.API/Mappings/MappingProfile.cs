using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vendor, VendorDto>();

            CreateMap<CreateVendorDto, Vendor>();

            CreateMap<UpdateVendorDto, Vendor>();

            CreateMap<Contract, ContractDto>();

            CreateMap<CreateContractDto, Contract>();

            CreateMap<UpdateContractDto, Contract>();

            CreateMap<Document, DocumentDto>();

            CreateMap<AuditLog, AuditLogDto>().ReverseMap();

            CreateMap<User, UserDto>();

            CreateMap<CreateUserDto, User>();

            CreateMap<Contract, ContractDto>();

            CreateMap<RecentActivity, RecentActivityDto>();
        }

    }
}