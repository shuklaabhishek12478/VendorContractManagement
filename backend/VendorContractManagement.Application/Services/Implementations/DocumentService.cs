using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAuditLogService _auditLogService;
        private readonly IUserContextService _userContext;
        private readonly IContractRepository _contractRepository;
        private readonly IRecentActivityService _recentActivityService;
        public DocumentService(
            IDocumentRepository documentRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IAuditLogService auditLogService,
            IUserContextService userContext,
            IContractRepository contractRepository,
            IRecentActivityService recentActivityService)
        {
            _documentRepository = documentRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _auditLogService = auditLogService;
            _userContext = userContext;
            _contractRepository = contractRepository;
            _recentActivityService = recentActivityService;
        }

        public async Task<IEnumerable<DocumentDto>> GetByContractIdAsync(int contractId)
        {
            // var docs = await _documentRepository.GetByContractIdAsync(contractId);
            var contract =
         await _contractRepository
             .GetByIdAsync(contractId);

            if (contract == null)
                throw new Exception("Contract not found");

            if (_userContext.Role == "Vendor")
            {
                if (_userContext.VendorId == null)
                    throw new Exception("Vendor not found");

                if (contract.VendorId !=
                    _userContext.VendorId)
                {
                    throw new UnauthorizedAccessException(
                        "Access denied");
                }
            }

            var docs = await _documentRepository.GetByContractIdAsync(contractId);

            return _mapper.Map<IEnumerable<DocumentDto>>(docs);
        }

        public async Task<DocumentDto?> GetByIdAsync(int id)
        {
            var doc = await _documentRepository.GetByIdAsync(id);
            return _mapper.Map<DocumentDto>(doc);
        }

        // 🚀 PRODUCTION GRADE UPLOAD
        public async Task<string> UploadAsync(DocumentUploadDto dto)
        {
            if (dto.FileContent == null || dto.FileContent.Length == 0)
                throw new Exception("File is empty");

            // Contract exists?
            var contract =
                await _contractRepository
                    .GetByIdAsync(dto.ContractId);

            if (contract == null)
                throw new Exception("Contract not found");

            // Only Approved / Active contracts
            if (contract.Status != ContractStatus.Approved
                &&
                contract.Status != ContractStatus.Active)
            {
                throw new Exception(
                    "Documents can only be uploaded to approved contracts");
            }

            // 🔥 File size limit (5 MB)
            if (dto.FileContent.Length > 5 * 1024 * 1024)
                throw new Exception("File size exceeds 5 MB limit");

            // 🔥 Allowed extensions
            var allowedExtensions = new[] { ".pdf", ".docx", ".png", ".jpg" };
            var extension = Path.GetExtension(dto.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
                throw new Exception("Invalid file type");

            // 🔥 Secure file name
            var uniqueFileName = $"{Guid.NewGuid()}{extension}";

            // 🔥 Safe folder path
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var filePath = Path.Combine(folder, uniqueFileName);

            await File.WriteAllBytesAsync(filePath, dto.FileContent);

            // 🔥 Save DB entity
            var document = new Document
            {
                ContractId = dto.ContractId,
                FileName = uniqueFileName,
                OriginalFileName = dto.FileName,
                FilePath = filePath,
                ContentType = dto.ContentType,
                FileSize = dto.FileContent.Length,
                UploadedOn = DateTime.UtcNow
            };

            await _documentRepository.AddAsync(document);

            // 🔥 Audit Log (UPLOAD)
            await _auditLogService.LogAsync(new AuditLog
            {
                Action = "UPLOAD",
                EntityName = "Document",
                EntityId = document.Id,
                PerformedBy = _userContext.UserId,
                NewValues = $"FileName: {document.FileName}, ContractId: {document.ContractId}"
            });

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Document",
    action: "Uploaded",
    description: $"Document {document.OriginalFileName} uploaded",
    entityId: document.Id,
    entityName: document.OriginalFileName,
    entityType: "Document",
    performedBy: _userContext.UserId
);
            return "Uploaded successfully";
        }

        // 🚀 DELETE
        public async Task<bool> DeleteAsync(int id)
        {
            var doc = await _documentRepository.GetByIdAsync(id);

            if (doc == null)
                return false;

            // delete physical file
            if (File.Exists(doc.FilePath))
                File.Delete(doc.FilePath);

            _documentRepository.Delete(doc);

            // 🔥 Audit Log (DELETE)
            await _auditLogService.LogAsync(new AuditLog
            {
                Action = "DELETE",
                EntityName = "Document",
                EntityId = doc.Id,
                PerformedBy = _userContext.UserId,
                OldValues = $"FileName: {doc.FileName}, Path: {doc.FilePath}"
            });

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Document",
    action: "Deleted",
    description: $"Document {doc.OriginalFileName} deleted",
    entityId: doc.Id,
    entityName: doc.OriginalFileName,
    entityType: "Document",
    performedBy: _userContext.UserId
);
            return true;
        }

        // 🚀 DOWNLOAD
        public async Task<(byte[] file, string contentType, string fileName)?> DownloadAsync(int id)
        {
            //  var doc = await _documentRepository.GetByIdAsync(id);
            var doc =
    await _documentRepository
        .GetByIdWithContractAsync(id);

            if (doc == null)
                return null;

            if (_userContext.Role == "Vendor")
            {
                if (_userContext.VendorId == null)
                    throw new Exception("Vendor not found");

                if (doc.Contract.VendorId !=
                    _userContext.VendorId)
                {
                    throw new UnauthorizedAccessException(
                        "Access denied");
                }
            }

            var bytes = await File.ReadAllBytesAsync(doc.FilePath);

            return (bytes, doc.ContentType, doc.OriginalFileName);
        }
    }
}