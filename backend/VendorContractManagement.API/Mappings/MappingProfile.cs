using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;

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

            CreateMap<CreateContractDto, Contract>()
                .ForMember(
                    dest => dest.Status,
                    opt => opt.MapFrom(src => ContractStatus.Draft));

            CreateMap<UpdateContractDto, Contract>()
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.ApprovedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ApprovedOn, opt => opt.Ignore())
                .ForMember(dest => dest.ParentContractId, opt => opt.Ignore())
                .ForMember(dest => dest.Renewals, opt => opt.Ignore())
                .ForMember(dest => dest.Documents, opt => opt.Ignore());

            CreateMap<Document, DocumentDto>();

            CreateMap<AuditLog, AuditLogDto>().ReverseMap();

            CreateMap<User, UserDto>();

            CreateMap<CreateUserDto, User>();

            CreateMap<RecentActivity, RecentActivityDto>();

            CreateMap<VendorDocument, VendorDocumentDto>();

            CreateMap<VendorDocumentDto, VendorDocument>();
            CreateMap<VendorDocumentUploadDto, VendorDocument>();
        }

    }
}