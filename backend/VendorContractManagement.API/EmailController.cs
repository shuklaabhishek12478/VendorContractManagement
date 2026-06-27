using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(
            IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("test")]
        public async Task<IActionResult> SendTestEmail()
        {
            await _emailService.SendEmailAsync(
                "shuklaabhisheksai@gmail.com",
                "Vendor Contract Management Test",
                "<h2>Email Service Working Successfully 🚀</h2>");

            return Ok("Test Email Sent");
        }
    }
}