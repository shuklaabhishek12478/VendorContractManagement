using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class VendorDocumentService
        : IVendorDocumentService
    {
        private readonly IVendorDocumentRepository _repository;

        private readonly IVendorRepository _vendorRepository;

        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;
        private readonly IAuditLogRepository _auditLogRepository;

        private readonly IRecentActivityService _recentActivityService;

        private readonly IUserContextService _userContext;
        public VendorDocumentService(
            IVendorDocumentRepository repository,
            IVendorRepository vendorRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
             IAuditLogRepository auditLogRepository,
    IRecentActivityService recentActivityService,
    IUserContextService userContext)
        {
            _repository = repository;
            _vendorRepository = vendorRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _auditLogRepository = auditLogRepository;
            _recentActivityService = recentActivityService;
            _userContext = userContext;
        }

        public async Task<List<VendorDocumentDto>> GetByVendorIdAsync(
    int vendorId)
        {
            var vendor =
                await _vendorRepository.GetByIdAsync(vendorId);

            if (vendor == null)
                throw new Exception("Vendor not found.");

            var documents =
                await _repository.GetByVendorIdAsync(vendorId);

            return _mapper.Map<List<VendorDocumentDto>>(
                documents);
        }

        public async Task<VendorDocumentDto?> GetByIdAsync(
    int id)
        {
            var document =
                await _repository.GetByIdAsync(id);

            if (document == null)
                return null;

            return _mapper.Map<VendorDocumentDto>(
                document);
        }

        public async Task<int> UploadAsync(
    VendorDocumentUploadRequest request)
        {
            var vendor =
                await _vendorRepository.GetByIdAsync(request.VendorId);

            if (vendor == null)
                throw new Exception("Vendor not found.");

            if (request.File == null || request.File.Length == 0)
                throw new Exception("Please select a file.");

            using var memoryStream = new MemoryStream();

            await request.File.CopyToAsync(memoryStream);

            var document = new VendorDocument
            {
                VendorId = request.VendorId,

                FileName = Guid.NewGuid().ToString()
                           + Path.GetExtension(request.File.FileName),

                OriginalFileName = request.File.FileName,

                ContentType = request.File.ContentType,

                FileSize = request.File.Length,

                FileContent = memoryStream.ToArray(),

                DocumentType = request.DocumentType,

                UploadedOn = DateTime.UtcNow
            };

            await _repository.AddAsync(document);

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
    module: "Vendor",
    action: "Document Uploaded",
    description: $"Document '{document.OriginalFileName}' uploaded.",
    entityId: vendor.Id,
    entityName: vendor.CompanyName,
    entityType: "Vendor",
    performedBy: _userContext.UserId
);

            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "Vendor Document Upload",
                EntityName = "VendorDocument",
                EntityId = document.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();

            return document.Id;
        }

        public async Task<byte[]> DownloadAsync(
    int id)
        {
            var document =
                await _repository.GetByIdAsync(id);

            if (document == null)
                throw new Exception("Document not found.");

            return document.FileContent;
        }

        public async Task DeleteAsync(
    int id)
        {
            var document =
                await _repository.GetByIdAsync(id);

            if (document == null)
                throw new Exception("Document not found.");

            _repository.Delete(document);

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
                module: "Vendor",
                action: "Document Deleted",
                description: $"Document '{document.OriginalFileName}' deleted.",
                entityId: document.VendorId,
                entityName: document.OriginalFileName,
                entityType: "Vendor",
                performedBy: _userContext.UserId
            );

            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "Vendor Document Delete",
                EntityName = "VendorDocument",
                EntityId = document.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();
        }
    }
}