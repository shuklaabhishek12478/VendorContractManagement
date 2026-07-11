using VendorContractManagement.Application.Interfaces;
using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuditLogRepository _auditLogRepository;
        private readonly IUserContextService _userContext;
        private readonly IContractRepository _contractRepository;
        private readonly IRecentActivityService _recentActivityService;
        private readonly IDocumentRepository _documentRepository;
        public VendorService(
             IVendorRepository vendorRepository,
             IMapper mapper,
             IUnitOfWork unitOfWork,
             IAuditLogRepository auditLogRepository,
             IUserContextService userContext,
             IContractRepository contractRepository,
             IRecentActivityService recentActivityService,
             IDocumentRepository documentRepository)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _auditLogRepository = auditLogRepository;
            _userContext = userContext;
            _contractRepository = contractRepository;
            _recentActivityService = recentActivityService;
            _documentRepository = documentRepository;
        }

        public async Task<IEnumerable<VendorDto>> GetAllAsync()
        {
            var vendors = await _vendorRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<VendorDto>>(vendors);
        }

        public async Task<VendorDto?> GetByIdAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);

            return _mapper.Map<VendorDto>(vendor);
        }

        public async Task<int> CreateAsync(CreateVendorDto dto)
        {
            var vendor = _mapper.Map<Vendor>(dto);

            if (await _vendorRepository.GetByEmailAsync(dto.Email) != null)
                throw new Exception("Email already exists");

            if (await _vendorRepository.GetByGSTAsync(dto.GSTNumber) != null)
                throw new Exception("GST Number already exists");

            if (await _vendorRepository.GetByPANAsync(dto.PANNumber) != null)
                throw new Exception("PAN Number already exists");


            await _vendorRepository.AddAsync(vendor);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Vendor",
    action: "Created",
    description: $"Vendor {vendor.CompanyName} created",
    entityId: vendor.Id,
    entityName: vendor.CompanyName,
    entityType: "Vendor",
    performedBy: _userContext.UserId
);
            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "Create",
                EntityName = "Vendor",
                EntityId = vendor.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();
            return vendor.Id;
        }

        public async Task UpdateAsync(int id, UpdateVendorDto dto)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);

            if (vendor == null)
                throw new Exception("Vendor not found");

            _mapper.Map(dto, vendor);

            _vendorRepository.Update(vendor);

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
    module: "Vendor",
    action: "Updated",
    description: $"Vendor {vendor.CompanyName} updated",
    entityId: vendor.Id,
    entityName: vendor.CompanyName,
    entityType: "Vendor",
    performedBy: _userContext.UserId
);

            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "Update",
                EntityName = "Vendor",
                EntityId = vendor.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);

            if (vendor == null)
                throw new Exception("Vendor not found");

            vendor.IsDeleted = true;

            _vendorRepository.Update(vendor);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
     module: "Vendor",
     action: "Deleted",
     description: $"Vendor {vendor.CompanyName} deleted",
     entityId: vendor.Id,
     entityName: vendor.CompanyName,
     entityType: "Vendor",
     performedBy: _userContext.UserId
 );
            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "Delete",
                EntityName = "Vendor",
                EntityId = vendor.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();
        }


        public async Task ActivateAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);

            if (vendor == null)
                throw new Exception("Vendor not found");

            vendor.IsActive = true;

            _vendorRepository.Update(vendor);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Vendor",
    action: "Activated",
    description: $"Vendor {vendor.CompanyName} activated",
    entityId: vendor.Id,
    entityName: vendor.CompanyName,
    entityType: "Vendor",
    performedBy: _userContext.UserId
);
        }

        public async Task DeactivateAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);

            if (vendor == null)
                throw new Exception("Vendor not found");

            vendor.IsActive = false;

            _vendorRepository.Update(vendor);

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Vendor",
    action: "Deactivated",
    description: $"Vendor {vendor.CompanyName} deactivated",
    entityId: vendor.Id,
    entityName: vendor.CompanyName,
    entityType: "Vendor",
    performedBy: _userContext.UserId
);
        }

        public async Task<PagedResponse<VendorDto>>GetPagedAsync(VendorQueryParams query)
        {
            var (vendors, totalCount) =
                await _vendorRepository
                    .GetPagedAsync(query);

            var data =
                _mapper.Map<IEnumerable<VendorDto>>
                (vendors);

            return new PagedResponse<VendorDto>
            {
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalCount,
                TotalPages =
                    (int)Math.Ceiling(
                        totalCount /
                        (double)query.PageSize),

                Data = data
            };
        }

        public async Task<IEnumerable<ContractDto>>GetContractsAsync(int vendorId)
        {
            var vendor =
                await _vendorRepository
                    .GetByIdAsync(vendorId);

            if (vendor == null)
                throw new Exception("Vendor not found");

            var contracts =
                await _contractRepository
                    .GetByVendorIdAsync(vendorId);

            return _mapper.Map<IEnumerable<ContractDto>>
                (contracts);
        }

        public async Task<IEnumerable<DocumentDto>> GetDocumentsAsync(int vendorId)
        {
            var vendor =
                await _vendorRepository.GetByIdAsync(vendorId);

            if (vendor == null)
                throw new Exception("Vendor not found");

            var contracts =
                await _contractRepository.GetByVendorIdAsync(vendorId);

            var contractIds =
                contracts
                    .Select(x => x.Id)
                    .ToList();

            var documents =
                await _documentRepository
                    .GetByContractIdsAsync(contractIds);

            return _mapper.Map<IEnumerable<DocumentDto>>(documents);
        }
    }
}