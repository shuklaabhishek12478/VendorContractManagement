using AutoMapper;
using ClosedXML.Excel;
using VendorContractManagement.Application.DTOs.Expenditure;
using VendorContractManagement.Application.Exceptions;
using VendorContractManagement.Application.Helpers;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Helpers;
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

    private readonly NotificationHelper _notificationHelper;

    public ExpenditureService(
        IExpenditureRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IRecentActivityService recentActivityService,
        IAuditLogService auditLogService,
        NotificationHelper notificationHelper)
    {
        _repository = repository;

        _unitOfWork = unitOfWork;

        _mapper = mapper;

        _recentActivityService = recentActivityService;

        _auditLogService = auditLogService;

        _notificationHelper = notificationHelper;
    }

    public async Task<List<ExpenditureDto>> GetAllAsync()
    {
        var expenditures =
            await _repository.GetAllAsync();

        return _mapper.Map<List<ExpenditureDto>>(
            expenditures);
    }

    public async Task<ExpenditureDto> GetByIdAsync(
    int id)
    {
        var expenditure =
            await _repository.GetByIdAsync(id);

        if (expenditure == null)
        {
            throw new NotFoundException(
                "Expenditure not found.");
        }

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

    public async Task<ExpenditureDto> CreateAsync(CreateExpenditureDto dto)
    {
        // Duplicate Invoice Check
        if (await _repository.IsInvoiceExistsAsync(dto.InvoiceNumber))
        {
            throw new BusinessRuleException("Invoice number already exists.");
        }

        // Vendor Validation
        var vendor = await _unitOfWork.Vendors.GetByIdAsync(dto.VendorId);

        if (vendor == null)
        {
            throw new BusinessRuleException($"Vendor with Id {dto.VendorId} not found.");
        }

        // Contract Validation
        if (dto.ContractId.HasValue)
        {
            var contract =
                await _unitOfWork.Contracts.GetByIdAsync(dto.ContractId.Value);

            if (contract == null)
            {
                throw new BusinessRuleException(
                    $"Contract with Id {dto.ContractId} not found.");
            }
        }

        // Mapping
        var entity = _mapper.Map<Expenditure>(dto);

        entity.ExpenseNumber = await GenerateExpenseNumberAsync();

        entity.CreatedOn = DateTime.UtcNow;
        entity.CreatedBy = "System";

        entity.IsActive = true;
        entity.IsDeleted = false;

        entity.Status = Domain.Enums.ExpenditureStatus.Draft;
        entity.PaymentStatus = Domain.Enums.PaymentStatus.Pending;

        // Tax Calculation
        entity.TaxAmount =
            Math.Round(entity.Amount * entity.TaxPercentage / 100, 2);

        entity.TotalAmount =
            entity.Amount + entity.TaxAmount;

        try
        {
            await _repository.AddAsync(entity);

            await _unitOfWork.SaveChangesAsync();

            await _notificationHelper.CreateAsync(
    module: "Expenditure",
    title: "Expenditure Created",
    message: $"Expense '{entity.ExpenseNumber}' has been created.",
    entityId: entity.Id,
    actionUrl: $"/expenditures/{entity.Id}"
);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Database Save Failed : {ex.InnerException?.Message ?? ex.Message}");
        }

        try
        {
            await _recentActivityService.LogAsync(
                module: "Expenditure",
                action: "Created",
                description: $"Expense {entity.ExpenseNumber} created.",
                entityId: entity.Id,
                entityName: entity.Title,
                entityType: "Expenditure",
                performedBy: entity.CreatedBy
            );
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Recent Activity Failed : {ex.InnerException?.Message ?? ex.Message}");
        }

        try
        {
            await _auditLogService.LogAsync(
                new AuditLog
                {
                    Action = "Create",
                    EntityName = "Expenditure",
                    EntityId = entity.Id,
                    PerformedBy = entity.CreatedBy,
                    OldValues = null,
                    NewValues = AuditSerializationHelper.Serialize(GetAuditObject(entity)),
                    CreatedOn = DateTime.UtcNow
                });
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Audit Log Failed : {ex.InnerException?.Message ?? ex.Message}");
        }

        return _mapper.Map<ExpenditureDto>(entity);
    }


    public async Task<ExpenditureDto> UpdateAsync(
    int id,
    UpdateExpenditureDto dto)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
        {
            throw new NotFoundException(
    "Expenditure not found.");
        }

        // Duplicate Invoice Check

        if (await _repository.IsInvoiceExistsAsync(
    dto.InvoiceNumber,
    id))
        {
            throw new BusinessRuleException(
    "Invoice number already exists.");
        }

        // Store Old Values

        var oldValues =
            AuditSerializationHelper.Serialize(GetAuditObject(entity));

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

        await _notificationHelper.CreateAsync(
    module: "Expenditure",
    title: "Expenditure Updated",
    message: $"Expense '{entity.ExpenseNumber}' has been updated.",
    entityId: entity.Id,
    actionUrl: $"/expenditures/{entity.Id}"
);

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

                NewValues = AuditSerializationHelper.Serialize(GetAuditObject(entity)),


                CreatedOn = DateTime.UtcNow
            });

        return _mapper.Map<ExpenditureDto>(entity);
    }


    public async Task DeleteAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
        {
            throw new NotFoundException(
    "Expenditure not found.");
        }

        var oldValues = AuditSerializationHelper.Serialize(
                    GetAuditObject(entity));
       
        _repository.Delete(entity);

        await _unitOfWork.SaveChangesAsync();

        await _notificationHelper.CreateAsync(
    module: "Expenditure",
    title: "Expenditure Deleted",
    message: $"Expense '{entity.ExpenseNumber}' has been deleted.",
    entityId: entity.Id
);

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
        if (filter.MinAmount > filter.MaxAmount &&
            filter.MaxAmount.HasValue)
        {
            throw new BusinessRuleException(
                "Minimum amount cannot be greater than maximum amount.");
        }

        if (filter.FromDate > filter.ToDate &&
            filter.ToDate.HasValue)
        {
            throw new BusinessRuleException(
                "From date cannot be greater than To date.");
        }

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


    public async Task<byte[]> ExportToExcelAsync(
    ExpenditureFilterDto filter)
    {
        var expenditures =
            await _repository.ExportAsync(filter);

        using var workbook = new XLWorkbook();

        var worksheet =
            workbook.Worksheets.Add("Expenditures");

        int row = 1;

        worksheet.Cell(row, 1).Value = "Vendor Contract Management System";
        worksheet.Range(row, 1, row, 12).Merge();

        worksheet.Cell(row, 1).Style.Font.Bold = true;
        worksheet.Cell(row, 1).Style.Font.FontSize = 18;

        row++;

        worksheet.Cell(row, 1).Value = "Expenditure Report";

        worksheet.Range(row, 1, row, 12).Merge();

        worksheet.Cell(row, 1).Style.Font.Bold = true;
        worksheet.Cell(row, 1).Style.Font.FontSize = 14;

        row += 2;

        worksheet.Cell(row, 1).Value = "Expense No";
        worksheet.Cell(row, 2).Value = "Title";
        worksheet.Cell(row, 3).Value = "Vendor";
        worksheet.Cell(row, 4).Value = "Invoice";
        worksheet.Cell(row, 5).Value = "Expense Date";
        worksheet.Cell(row, 6).Value = "Department";
        worksheet.Cell(row, 7).Value = "Category";
        worksheet.Cell(row, 8).Value = "Payment Status";
        worksheet.Cell(row, 9).Value = "Currency";
        worksheet.Cell(row, 10).Value = "Amount";
        worksheet.Cell(row, 11).Value = "Tax";
        worksheet.Cell(row, 12).Value = "Total";

        worksheet.Range(row, 1, row, 12)
            .Style.Font.Bold = true;

        worksheet.Range(row, 1, row, 12)
            .Style.Fill.BackgroundColor =
            XLColor.LightGray;

        row++;

        foreach (var item in expenditures)
        {
            worksheet.Cell(row, 1).Value = item.ExpenseNumber;
            worksheet.Cell(row, 2).Value = item.Title;
            worksheet.Cell(row, 3).Value = item.Vendor?.CompanyName ?? ""; ;
            worksheet.Cell(row, 4).Value = item.InvoiceNumber;
            worksheet.Cell(row, 5).Value = item.ExpenseDate;
            worksheet.Cell(row, 6).Value = item.Department.ToString();
            worksheet.Cell(row, 7).Value = item.Category.ToString();
            worksheet.Cell(row, 8).Value = item.PaymentStatus.ToString();
            worksheet.Cell(row, 9).Value = item.Currency.ToString();
            worksheet.Cell(row, 10).Value = item.Amount;
            worksheet.Cell(row, 11).Value = item.TaxAmount;
            worksheet.Cell(row, 12).Value = item.TotalAmount;

            row++;
        }

        worksheet.Column(5)
            .Style.DateFormat.Format = "dd-MMM-yyyy";

        worksheet.Columns(10, 12)
            .Style.NumberFormat.Format = "#,##0.00";

        worksheet.Columns()
            .AdjustToContents();

        worksheet.SheetView.FreezeRows(4);

        worksheet.RangeUsed()
            .SetAutoFilter();

        worksheet.Cell(row + 1, 11).Value = "Grand Total";

        worksheet.Cell(row + 1, 12).FormulaA1 =
            $"SUM(L5:L{row - 1})";

        worksheet.Cell(row + 1, 11).Style.Font.Bold = true;
        worksheet.Cell(row + 1, 12).Style.Font.Bold = true;

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        return stream.ToArray();
    }

    private static object GetAuditObject(Expenditure entity)
    {
        return new
        {
            entity.Id,
            entity.ExpenseNumber,
            entity.Title,
            entity.VendorId,
            entity.ContractId,
            entity.Department,
            entity.CostCenter,
            entity.Category,
            entity.ExpenseType,
            entity.ExpenseDate,
            entity.InvoiceNumber,
            entity.PurchaseOrderNumber,
            entity.InvoiceDate,
            entity.DueDate,
            entity.Currency,
            entity.Amount,
            entity.TaxPercentage,
            entity.TaxAmount,
            entity.TotalAmount,
            entity.PaymentStatus,
            entity.PaymentMethod,
            entity.Status,
            entity.Description,
            entity.Remarks,
            entity.IsRecurring,
            entity.RecurringMonths,
            entity.IsForecasted,
            entity.IsActive,
            entity.IsDeleted,
            entity.CreatedOn,
            entity.CreatedBy,
            entity.UpdatedOn,
            entity.UpdatedBy
        };
    }
}