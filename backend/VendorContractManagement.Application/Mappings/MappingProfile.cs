using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Expenditure;
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

            CreateMap<User, UserDto>();

            CreateMap<CreateUserDto, User>();

            CreateMap<RecentActivity, RecentActivityDto>();

            CreateMap<VendorDocument, VendorDocumentDto>();

            CreateMap<Expenditure, ExpenditureDto>();

            CreateMap<CreateExpenditureDto, Expenditure>();

            CreateMap<UpdateExpenditureDto, Expenditure>();

            CreateMap<VendorDocumentDto, VendorDocument>();
        }
    }
}