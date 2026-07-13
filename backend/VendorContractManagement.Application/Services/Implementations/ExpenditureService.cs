using AutoMapper;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations;

public class ExpenditureService
    : IExpenditureService
{
    private readonly IExpenditureRepository _repository;

    private readonly IUnitOfWork _unitOfWork;

    private readonly IMapper _mapper;

    private readonly IRecentActivityService _recentActivityService;

    private readonly IAuditLogService _auditLogService;

    public ExpenditureService(
        IExpenditureRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IRecentActivityService recentActivityService,
        IAuditLogService auditLogService)
    {
        _repository = repository;

        _unitOfWork = unitOfWork;

        _mapper = mapper;

        _recentActivityService = recentActivityService;

        _auditLogService = auditLogService;
    }

    public async Task<List<ExpenditureDto>> GetAllAsync()
    {
        var expenditures =
            await _repository.GetAllAsync();

        return _mapper.Map<List<ExpenditureDto>>(
            expenditures);
    }

    public async Task<ExpenditureDto?> GetByIdAsync(
    int id)
    {
        var expenditure =
            await _repository.GetByIdAsync(id);

        if (expenditure == null)
            return null;

        return _mapper.Map<ExpenditureDto>(
            expenditure);
    }

    private async Task<string> GenerateExpenseNumberAsync()
    {
        var year = DateTime.UtcNow.Year;

        var lastExpenseNumber =
            await _repository.GetLastExpenseNumberAsync();

        int nextNumber = 1;

        if (!string.IsNullOrWhiteSpace(lastExpenseNumber))
        {
            var parts = lastExpenseNumber.Split('-');

            if (parts.Length == 3)
            {
                int.TryParse(parts[2], out nextNumber);

                nextNumber++;
            }
        }

        return $"EXP-{year}-{nextNumber:D6}";
    }

    public async Task<ExpenditureDto> CreateAsync(
    CreateExpenditureDto dto)
    {
        // Duplicate Invoice Check

        if (await _repository.IsInvoiceExistsAsync(dto.InvoiceNumber))
        {
            throw new Exception(
                "Invoice number already exists.");
        }

        var entity =
            _mapper.Map<Expenditure>(dto);

        entity.ExpenseNumber =
            await GenerateExpenseNumberAsync();

        entity.CreatedOn = DateTime.UtcNow;

        entity.IsActive = true;

        entity.IsDeleted = false;

        // Tax Calculation

        entity.TaxAmount =
            entity.Amount *
            entity.TaxPercentage / 100;

        entity.TotalAmount =
            entity.Amount +
            entity.TaxAmount;

        await _repository.AddAsync(entity);

        await _unitOfWork.SaveChangesAsync();

        // Recent Activity

        await _recentActivityService.LogAsync(

            module: "Expenditure",

            action: "Created",

            description:
                $"Expense {entity.ExpenseNumber} created.",

            entityId: entity.Id,

            entityName: entity.Title,

            entityType: "Expenditure"
        );

        // Audit Log

        await _auditLogService.LogAsync(
    new AuditLog
    {
        Action = "Create",

        EntityName = "Expenditure",

        EntityId = entity.Id,

        PerformedBy = entity.CreatedBy,

        OldValues = null,

        NewValues =
            System.Text.Json.JsonSerializer.Serialize(entity),

        CreatedOn = DateTime.UtcNow
    });

        return _mapper.Map<ExpenditureDto>(entity);
    }


    public async Task<ExpenditureDto> UpdateAsync(
    int id,
    UpdateExpenditureDto dto)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
        {
            throw new Exception("Expenditure not found.");
        }

        // Duplicate Invoice Check

        if (await _repository.IsInvoiceExistsAsync(
    dto.InvoiceNumber,
    id))
        {
            throw new Exception(
                "Invoice number already exists.");
        }

        // Store Old Values

        var oldValues =
            System.Text.Json.JsonSerializer.Serialize(entity);

        // Update Properties

        _mapper.Map(dto, entity);

        entity.UpdatedOn = DateTime.UtcNow;

        // Recalculate Tax

        entity.TaxAmount =
            entity.Amount * entity.TaxPercentage / 100;

        entity.TotalAmount =
            entity.Amount + entity.TaxAmount;

        _repository.Update(entity);

        await _unitOfWork.SaveChangesAsync();

        // Recent Activity

        await _recentActivityService.LogAsync(

            module: "Expenditure",

            action: "Updated",

            description:
                $"Expense {entity.ExpenseNumber} updated.",

            entityId: entity.Id,

            entityName: entity.Title,

            entityType: "Expenditure"
        );

        // Audit Log

        await _auditLogService.LogAsync(

            new AuditLog
            {
                Action = "Update",

                EntityName = "Expenditure",

                EntityId = entity.Id,

                PerformedBy = entity.UpdatedBy,

                OldValues = oldValues,

                NewValues =
                    System.Text.Json.JsonSerializer.Serialize(entity),

                CreatedOn = DateTime.UtcNow
            });

        return _mapper.Map<ExpenditureDto>(entity);
    }


    public async Task DeleteAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
        {
            throw new Exception("Expenditure not found.");
        }

        var oldValues =
            System.Text.Json.JsonSerializer.Serialize(entity);

        _repository.Delete(entity);

        await _unitOfWork.SaveChangesAsync();

        // Recent Activity

        await _recentActivityService.LogAsync(

            module: "Expenditure",

            action: "Deleted",

            description:
                $"Expense {entity.ExpenseNumber} deleted.",

            entityId: entity.Id,

            entityName: entity.Title,

            entityType: "Expenditure"
        );

        // Audit Log

        await _auditLogService.LogAsync(

            new AuditLog
            {
                Action = "Delete",

                EntityName = "Expenditure",

                EntityId = entity.Id,

                PerformedBy = entity.UpdatedBy,

                OldValues = oldValues,

                NewValues = null,

                CreatedOn = DateTime.UtcNow
            });
    }

    public async Task<List<ExpenditureDto>> SearchAsync(
    ExpenditureFilterDto filter)
    {
        var result =
            await _repository.SearchAsync(filter);

        return _mapper.Map<List<ExpenditureDto>>(result);
    }

    public async Task<ExpenditureDashboardDto>
    GetDashboardAsync()
    {
        var dashboard =
            new ExpenditureDashboardDto
            {
                Summary =
                    await _repository.GetSummaryAsync(),

                MonthlySpend =
                    await _repository.GetMonthlySpendAsync(),

                DepartmentSpend =
                    await _repository.GetDepartmentSpendAsync(),

                VendorSpend =
                    await _repository.GetVendorSpendAsync(),

                CategorySpend =
                    await _repository.GetCategorySpendAsync()
            };

        return dashboard;
    }

    public async Task<ExpenditureForecastDto>
    GetForecastAsync(
        int year)
    {
        return await _repository
            .GetForecastAsync(year);
    }
}