using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>>
            GetNotificationsAsync();
    }
}
