using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations;

public class NotificationService : INotificationService
{
    private readonly INotificationRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IContractRepository _contractRepository;
    private readonly IVendorRepository _vendorRepository;
    private readonly IExpenditureRepository _expenditureRepository;

    private readonly IMapper _mapper;

    public NotificationService(
        INotificationRepository repository,
        IUnitOfWork unitOfWork,
        IContractRepository contractRepository,
        IVendorRepository vendorRepository,
        IExpenditureRepository expenditureRepository,
        IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _contractRepository = contractRepository;
        _vendorRepository = vendorRepository;
        _expenditureRepository = expenditureRepository;
        _mapper = mapper;
    }

    public async Task CreateAsync(CreateNotificationDto dto)
    {
        var entity = new Notification
        {
            UserId = dto.UserId,
            Module = dto.Module,
            Type = dto.Type,
            Title = dto.Title,
            Message = dto.Message,
            ActionUrl = dto.ActionUrl,
            EntityId = dto.EntityId,
            CreatedOn = DateTime.UtcNow,
            IsRead = false,
            IsDeleted = false
        };

        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<List<NotificationDto>> GetUserNotificationsAsync(int userId)
    {
        var data = await _repository.GetByUserAsync(userId);

        return _mapper.Map<List<NotificationDto>>(data);
    }

    public async Task<int> GetUnreadCountAsync(int userId)
    {
        return await _repository.GetUnreadCountAsync(userId);
    }

    public async Task<int> GetUnreadCountAsync()
    {
        var notifications = await GetNotificationsAsync();

        return notifications.Count;
    }

    public async Task MarkAsReadAsync(int notificationId)
    {
        var entity = await _repository.GetByIdAsync(notificationId);

        if (entity == null)
            return;

        entity.IsRead = true;
        entity.ReadOn = DateTime.UtcNow;

        _repository.Update(entity);

        await _unitOfWork.SaveChangesAsync();
    }

    public async Task MarkAllAsReadAsync(int userId)
    {
        var notifications = await _repository.GetByUserAsync(userId);

        foreach (var item in notifications.Where(x => !x.IsRead))
        {
            item.IsRead = true;
            item.ReadOn = DateTime.UtcNow;

            _repository.Update(item);
        }

        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<List<NotificationDto>> GetNotificationsAsync()
    {
        var notifications = new List<NotificationDto>();

        var contracts = await _contractRepository.GetAllAsync();

        var pendingContracts = contracts.Count(x =>
            x.Status == ContractStatus.PendingApproval);

        if (pendingContracts > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = NotificationType.Approval,
                Title = "Pending Contract Approvals",
                Message = $"{pendingContracts} contracts are waiting for approval.",
                CreatedOn = DateTime.UtcNow
            });
        }

        var expiringContracts = contracts.Count(x =>
            x.Status == ContractStatus.Active &&
            x.EndDate <= DateTime.UtcNow.AddDays(30));

        if (expiringContracts > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = NotificationType.Warning,
                Title = "Contracts Expiring Soon",
                Message = $"{expiringContracts} active contracts will expire within 30 days.",
                CreatedOn = DateTime.UtcNow
            });
        }

        var renewalContracts = contracts.Count(x =>
            x.IsRenewal &&
            x.Status == ContractStatus.RenewalPendingApproval);

        if (renewalContracts > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = NotificationType.Reminder,
                Title = "Pending Renewals",
                Message = $"{renewalContracts} contract renewals require approval.",
                CreatedOn = DateTime.UtcNow
            });
        }

        var vendors = await _vendorRepository.GetAllAsync();

        var inactiveVendors = vendors.Count(x => !x.IsActive);

        if (inactiveVendors > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = NotificationType.Info,
                Title = "Inactive Vendors",
                Message = $"{inactiveVendors} vendors are currently inactive.",
                CreatedOn = DateTime.UtcNow
            });
        }

        var expenditures = await _expenditureRepository.GetAllAsync();

        var pendingExpenses = expenditures.Count(x =>
            x.PaymentStatus == PaymentStatus.Pending);

        if (pendingExpenses > 0)
        {
            notifications.Add(new NotificationDto
            {
                Type = NotificationType.Warning,
                Title = "Pending Payments",
                Message = $"{pendingExpenses} expenditures are pending payment.",
                CreatedOn = DateTime.UtcNow
            });
        }

        return notifications
            .OrderByDescending(x => x.CreatedOn)
            .ToList();
    }

    public async Task<List<NotificationDto>> GetNotificationsAsync(string userId)
    {
        if (!int.TryParse(userId, out var id))
        {
            return new List<NotificationDto>();
        }

        return await GetUserNotificationsAsync(id);
    }
}