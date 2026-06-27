using AutoMapper;
using OfficeOpenXml;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class AuditLogService : IAuditLogService
    {
        private readonly IAuditLogRepository _auditLogRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuditLogService(
            IAuditLogRepository auditLogRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _auditLogRepository = auditLogRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<AuditLogDto>> GetFilteredAsync(
            AuditLogFilterDto filter,
            int page,
            int pageSize)
        {
            var query = await _auditLogRepository.Query();

            if (!string.IsNullOrEmpty(filter.UserId))
                query = query.Where(x => x.PerformedBy == filter.UserId);

            if (!string.IsNullOrEmpty(filter.EntityName))
                query = query.Where(x => x.EntityName == filter.EntityName);

            if (filter.FromDate.HasValue)
                query = query.Where(x => x.CreatedOn >= filter.FromDate);

            if (filter.ToDate.HasValue)
                query = query.Where(x => x.CreatedOn <= filter.ToDate);

            if (!string.IsNullOrEmpty(filter.Search))
            {
                query = query.Where(x =>
                    x.Action.Contains(filter.Search) ||
                    (x.OldValues != null && x.OldValues.Contains(filter.Search)) ||
                    (x.NewValues != null && x.NewValues.Contains(filter.Search)));
            }

            var totalCount = query.Count();

            var data = query
                .OrderByDescending(x => x.CreatedOn)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PaginatedResult<AuditLogDto>
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Data = _mapper.Map<List<AuditLogDto>>(data)
            };
        }

        public async Task LogAsync(AuditLog log)
        {
            await _auditLogRepository.AddAsync(log);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<AuditLogDto>> GetAllAsync()
        {
            var logs = await _auditLogRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AuditLogDto>>(logs);
        }


        public async Task<byte[]> ExportToExcelAsync()
        {
            var logs = await _auditLogRepository.GetAllAsync();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using var package = new ExcelPackage();
            var sheet = package.Workbook.Worksheets.Add("AuditLogs");

            // Headers
            sheet.Cells[1, 1].Value = "Action";
            sheet.Cells[1, 2].Value = "Entity";
            sheet.Cells[1, 3].Value = "EntityId";
            sheet.Cells[1, 4].Value = "PerformedBy";
            sheet.Cells[1, 5].Value = "Date";

            int row = 2;

            foreach (var log in logs)
            {
                sheet.Cells[row, 1].Value = log.Action;
                sheet.Cells[row, 2].Value = log.EntityName;
                sheet.Cells[row, 3].Value = log.EntityId;
                sheet.Cells[row, 4].Value = log.PerformedBy;
                sheet.Cells[row, 5].Value = log.CreatedOn;

                row++;
            }

            return package.GetAsByteArray();
        }

        public async Task<byte[]> ExportToExcelAsync(AuditLogFilterDto filter)
        {
            var query = await _auditLogRepository.Query();

            // 🔹 Filter by User
            if (!string.IsNullOrEmpty(filter.UserId))
                query = query.Where(x => x.PerformedBy == filter.UserId);

            // 🔹 Filter by Entity
            if (!string.IsNullOrEmpty(filter.EntityName))
                query = query.Where(x => x.EntityName == filter.EntityName);

            // 🔹 Date range filter
            if (filter.FromDate.HasValue)
                query = query.Where(x => x.CreatedOn >= filter.FromDate.Value);

            if (filter.ToDate.HasValue)
                query = query.Where(x => x.CreatedOn <= filter.ToDate.Value);

            // 🔹 Search filter
            if (!string.IsNullOrEmpty(filter.Search))
            {
                query = query.Where(x =>
                    x.Action.Contains(filter.Search) ||
                    (x.OldValues != null && x.OldValues.Contains(filter.Search)) ||
                    (x.NewValues != null && x.NewValues.Contains(filter.Search)) ||
                    x.EntityName.Contains(filter.Search));
            }

            var logs = query
                .OrderByDescending(x => x.CreatedOn)
                .ToList();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using var package = new ExcelPackage();
            var sheet = package.Workbook.Worksheets.Add("AuditLogs");

            // 🔥 Headers
            sheet.Cells[1, 1].Value = "Action";
            sheet.Cells[1, 2].Value = "Entity";
            sheet.Cells[1, 3].Value = "EntityId";
            sheet.Cells[1, 4].Value = "PerformedBy";
            sheet.Cells[1, 5].Value = "Date";
            sheet.Cells[1, 6].Value = "OldValues";
            sheet.Cells[1, 7].Value = "NewValues";

            int row = 2;

            foreach (var log in logs)
            {
                sheet.Cells[row, 1].Value = log.Action;
                sheet.Cells[row, 2].Value = log.EntityName;
                sheet.Cells[row, 3].Value = log.EntityId;
                sheet.Cells[row, 4].Value = log.PerformedBy;
                sheet.Cells[row, 5].Value = log.CreatedOn;
                sheet.Cells[row, 6].Value = log.OldValues;
                sheet.Cells[row, 7].Value = log.NewValues;

                row++;
            }

            // 🔥 Auto fit columns
            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

            return package.GetAsByteArray();
        }
    }
}