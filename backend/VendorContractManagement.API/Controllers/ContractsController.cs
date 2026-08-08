using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize]
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

        [PermissionAuthorize("Contract.View")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contracts = await _contractService.GetAllAsync();

            return Ok(contracts);
        }

        [PermissionAuthorize("Contract.ViewDetails")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var contract = await _contractService.GetByIdAsync(id);

            if (contract == null)
                return NotFound();

            return Ok(contract);
        }

        [PermissionAuthorize("Contract.Create")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateContractDto dto)
        {
            await _contractService.CreateAsync(dto);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Edit")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
          int id,
          UpdateContractDto dto)
        {
            await _contractService.UpdateAsync(id, dto);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Edit")]
        [HttpPost("{id}/archive")]
        public async Task<IActionResult> Archive(int id)
        {
            await _contractService.ArchiveAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contractService.DeleteAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Contract.View")]
        [HttpGet("expiring-soon")]
        public async Task<IActionResult> GetExpiringSoon(int days = 30)
        {
            return Ok(
                await _contractService.GetExpiringSoonAsync(days));
        }

        [PermissionAuthorize("Contract.View")]
        [HttpGet("expired")]
        public async Task<IActionResult> GetExpired()
        {
            return Ok(
                await _contractService.GetExpiredAsync());
        }

        [PermissionAuthorize("Contract.View")]
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            return Ok(
                await _contractService.GetActiveAsync());
        }

        [PermissionAuthorize("Contract.Activate")]
        [HttpPost("{id}/activate")]
        public async Task<IActionResult> Activate(int id)
        {
            await _contractService.ActivateAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Activate")]
        [HttpPost("expire")]
        public async Task<IActionResult> Expire()
        {
            await _contractService.ExpireContractsAsync();

            return NoContent();
        }


        [PermissionAuthorize("Contract.Activate")]
        [HttpPost("{id}/submit")]
        public async Task<IActionResult>Submit(int id)
        {
            await _contractService
                .SubmitAsync(id);

            return NoContent();
        }


        [PermissionAuthorize("Contract.Approve")]
        [HttpPost("{id}/approve")]
        public async Task<IActionResult>Approve(int id)
        {
            await _contractService
                .ApproveAsync(id);

            return NoContent();
        }


        [PermissionAuthorize("Contract.Reject")]
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


        [PermissionAuthorize("Contract.View")]
        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] ContractQueryParams query)
        {
            var result =
                await _contractService
                    .GetPagedAsync(query);

            return Ok(result);
        }

        [PermissionAuthorize("Contract.Submit")]
        [HttpPost("{id}/submit-again")]
        public async Task<IActionResult> SubmitAgain(int id)
        {
            await _contractService.SubmitAgainAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Renew")]
        [HttpPost("{id}/renew")]
        public async Task<IActionResult> Renew(int id,RenewContractDto dto)
        {
            await _contractService
                .RenewAsync(id, dto);

            return NoContent();
        }

        [PermissionAuthorize("Contract.RenewHistory")]
        [HttpGet("{id}/renewals")]
        public async Task<IActionResult> GetRenewals(int id)
        {
            return Ok(
                await _contractService
                    .GetRenewalsAsync(id));
        }


        [PermissionAuthorize("Contract.RenewApprove")]
        [HttpPost("{id}/approve-renewal")]
        public async Task<IActionResult> ApproveRenewal(int id)
        {
            await _contractService
                .ApproveRenewalAsync(id);

            return NoContent();
        }


        [PermissionAuthorize("Contract.Activate")]
        [HttpPost("{id}/activate-renewal")]
        public async Task<IActionResult>ActivateRenewal(int id)
        {
            await _contractService
                .ActivateRenewalAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Contract.RenewReject")]
        [HttpPost("{id}/reject-renewal")]
        public async Task<IActionResult> RejectRenewal(int id, RejectContractDto dto)
        {
            await _contractService
                .RejectRenewalAsync(
                    id,
                    dto.Reason);

            return NoContent();
        }

        [PermissionAuthorize("Contract.Terminate")]
        [HttpPost("{id}/terminate")]
        public async Task<IActionResult> Terminate(int id,TerminateContractDto dto)
        {
            await _contractService
                .TerminateAsync(id, dto.Reason);

            return NoContent();
        }


        [PermissionAuthorize("Report.View")]
        [HttpGet("report")]
        public async Task<IActionResult> GetReport([FromQuery] ContractReportFilterDto filter)
        {
            var result =
                await _contractService
                    .GetReportAsync(filter);

            return Ok(result);
        }


        [PermissionAuthorize("Contract.Export")]
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