using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IUserContextService _userContext;

        public NotificationsController(
            INotificationService notificationService,
            IUserContextService userContext)
        {
            _notificationService = notificationService;
            _userContext = userContext;
        }

        /// <summary>
        /// Dashboard Notifications
        /// </summary>
        [HttpGet]
        [Authorize(Policy = "Notification.View")]
        public async Task<IActionResult> Get()
        {
            var result =
                await _notificationService.GetNotificationsAsync();

            return Ok(result);
        }

        /// <summary>
        /// Logged-in User Notifications
        /// </summary>
        [HttpGet("my")]
        [Authorize(Policy = "Notification.View")]
        public async Task<IActionResult> MyNotifications()
        {
            if (!_userContext.UserId.HasValue)
                return Unauthorized();

            var result =
                await _notificationService.GetUserNotificationsAsync(
                    _userContext.UserId.Value);

            return Ok(result);
        }

        /// <summary>
        /// Logged-in User Unread Count
        /// </summary>
        [HttpGet("unread-count")]
        [Authorize(Policy = "Notification.View")]
        public async Task<IActionResult> UnreadCount()
        {
            if (!_userContext.UserId.HasValue)
                return Unauthorized();

            var count =
                await _notificationService.GetUnreadCountAsync(
                    _userContext.UserId.Value);

            return Ok(count);
        }

        /// <summary>
        /// Create Notification
        /// </summary>
        [HttpPost]
        [Authorize(Policy = "Notification.Create")]
        public async Task<IActionResult> Create(
            CreateNotificationDto dto)
        {
            await _notificationService.CreateAsync(dto);

            return Ok(new
            {
                message = "Notification created successfully."
            });
        }

        /// <summary>
        /// Mark Notification As Read
        /// </summary>
        [HttpPut("read/{id}")]
        [Authorize(Policy = "Notification.Update")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _notificationService.MarkAsReadAsync(id);

            return Ok(new
            {
                message = "Notification marked as read."
            });
        }

        /// <summary>
        /// Mark All Notifications As Read
        /// </summary>
        [HttpPut("read-all")]
        [Authorize(Policy = "Notification.Update")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            if (!_userContext.UserId.HasValue)
                return Unauthorized();

            await _notificationService.MarkAllAsReadAsync(
                _userContext.UserId.Value);

            return Ok(new
            {
                message = "All notifications marked as read."
            });
        }

       
        [HttpDelete("{id}")]
        [Authorize(Policy = "Notification.Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await _notificationService.DeleteAsync(id);

            return Ok(new
            {
                message = "Notification deleted successfully."
            });
        }

        
        [HttpDelete("clear-all")]
        [Authorize(Policy = "Notification.Delete")]
        public async Task<IActionResult> ClearAll()
        {
            if (!_userContext.UserId.HasValue)
                return Unauthorized();

            await _notificationService.DeleteAllAsync(
                _userContext.UserId.Value);

            return Ok(new
            {
                message = "All notifications cleared successfully."
            });
        }
    }
}