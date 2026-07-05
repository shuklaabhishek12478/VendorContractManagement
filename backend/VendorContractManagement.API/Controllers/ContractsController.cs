using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [EnableRateLimiting("fixed")]
    [ApiController]
    [Route("api/[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly IContractService _contractService;

        public ContractsController(IContractService contractService)
        {
            _contractService = contractService;
        }

        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contracts = await _contractService.GetAllAsync();

            return Ok(contracts);
        }

        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var contract = await _contractService.GetByIdAsync(id);

            if (contract == null)
                return NotFound();

            return Ok(contract);
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateContractDto dto)
        {
            await _contractService.CreateAsync(dto);

            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
          int id,
          UpdateContractDto dto)
        {
            await _contractService.UpdateAsync(id, dto);

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/archive")]
        public async Task<IActionResult> Archive(int id)
        {
            await _contractService.ArchiveAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contractService.DeleteAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager,Vendor")]
        [HttpGet("expiring-soon")]
        public async Task<IActionResult> GetExpiringSoon(int days = 30)
        {
            return Ok(
                await _contractService.GetExpiringSoonAsync(days));
        }

        [Authorize(Roles = "Admin,Manager,Vendor")]
        [HttpGet("expired")]
        public async Task<IActionResult> GetExpired()
        {
            return Ok(
                await _contractService.GetExpiredAsync());
        }

        [Authorize(Roles = "Admin,Manager,Vendor")]
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            return Ok(
                await _contractService.GetActiveAsync());
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("{id}/activate")]
        public async Task<IActionResult> Activate(int id)
        {
            await _contractService.ActivateAsync(id);

            return NoContent();
        }

        [HttpPost("expire")]
        public async Task<IActionResult> Expire()
        {
            await _contractService.ExpireContractsAsync();

            return NoContent();
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("{id}/submit")]
        public async Task<IActionResult>Submit(int id)
        {
            await _contractService
                .SubmitAsync(id);

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/approve")]
        public async Task<IActionResult>Approve(int id)
        {
            await _contractService
                .ApproveAsync(id);

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/reject")]
        public async Task<IActionResult>Reject(
        int id,
        RejectContractDto dto)
        {
            await _contractService
                .RejectAsync(
                    id,
                    dto.Reason);

            return Ok("Rejected successfully");
        }


        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] ContractQueryParams query)
        {
            var result =
                await _contractService
                    .GetPagedAsync(query);

            return Ok(result);
        }

        [HttpPost("{id}/submit-again")]
        public async Task<IActionResult> SubmitAgain(int id)
        {
            await _contractService.SubmitAgainAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("{id}/renew")]
        public async Task<IActionResult> Renew(int id,RenewContractDto dto)
        {
            await _contractService
                .RenewAsync(id, dto);

            return NoContent();
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("{id}/renewals")]
        public async Task<IActionResult> GetRenewals(int id)
        {
            return Ok(
                await _contractService
                    .GetRenewalsAsync(id));
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/approve-renewal")]
        public async Task<IActionResult> ApproveRenewal(int id)
        {
            await _contractService
                .ApproveRenewalAsync(id);

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/activate-renewal")]
        public async Task<IActionResult>ActivateRenewal(int id)
        {
            await _contractService
                .ActivateRenewalAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/reject-renewal")]
        public async Task<IActionResult> RejectRenewal(int id, RejectContractDto dto)
        {
            await _contractService
                .RejectRenewalAsync(
                    id,
                    dto.Reason);

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/terminate")]
        public async Task<IActionResult> Terminate(int id,TerminateContractDto dto)
        {
            await _contractService
                .TerminateAsync(id, dto.Reason);

            return NoContent();
        }


        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet("report")]
        public async Task<IActionResult> GetReport([FromQuery] ContractReportFilterDto filter)
        {
            var result =
                await _contractService
                    .GetReportAsync(filter);

            return Ok(result);
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("export")]
        public async Task<IActionResult> Export([FromQuery] ContractReportFilterDto filter)
        {
            var fileBytes =
                await _contractService
                    .ExportContractsAsync(filter);

            return File(
                fileBytes,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Contracts.xlsx");
        }

        
    }
}