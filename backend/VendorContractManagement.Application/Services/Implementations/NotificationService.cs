using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        private readonly IContractRepository _contractRepository;

        public NotificationService(
            IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<IEnumerable<NotificationDto>>
            GetNotificationsAsync()
        {
            var contracts =
                await _contractRepository.GetAllAsync();

            var notifications =
                new List<NotificationDto>();

            var pendingContracts =
                contracts.Count(x =>
                    x.Status ==
                    ContractStatus.PendingApproval);

            if (pendingContracts > 0)
            {
                notifications.Add(
                    new NotificationDto
                    {
                        Type = "PendingApproval",
                        Title = "Pending Contracts",
                        Message =
                            $"{pendingContracts} contracts are waiting for approval",
                        CreatedOn =
                            DateTime.UtcNow
                    });
            }

            var expiringContracts =
                contracts.Count(x =>
                    x.Status ==
                    ContractStatus.Active
                    &&
                    x.EndDate <=
                    DateTime.UtcNow.AddDays(30));

            if (expiringContracts > 0)
            {
                notifications.Add(
                    new NotificationDto
                    {
                        Type = "Expiring",
                        Title = "Contracts Expiring",
                        Message =
                            $"{expiringContracts} contracts expire within 30 days",
                        CreatedOn =
                            DateTime.UtcNow
                    });
            }

            var pendingRenewals =
                contracts.Count(x =>
                    x.IsRenewal
                    &&
                    x.Status ==
                    ContractStatus.RenewalPendingApproval);

            if (pendingRenewals > 0)
            {
                notifications.Add(
                    new NotificationDto
                    {
                        Type = "Renewal",
                        Title = "Pending Renewals",
                        Message =
                            $"{pendingRenewals} renewals are awaiting approval",
                        CreatedOn =
                            DateTime.UtcNow
                    });
            }

            return notifications;
        }
    }
}