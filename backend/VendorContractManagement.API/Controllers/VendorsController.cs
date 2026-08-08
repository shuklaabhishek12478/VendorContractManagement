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
    public class VendorsController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorsController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }


        [PermissionAuthorize("Vendor.View")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vendors = await _vendorService.GetAllAsync();

            return Ok(vendors);
        }


        [PermissionAuthorize("Vendor.ViewDetails")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var vendor = await _vendorService.GetByIdAsync(id);

            if (vendor == null)
                return NotFound();

            return Ok(vendor);
        }


        [PermissionAuthorize("Vendor.Create")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateVendorDto dto)
        {
            // await _vendorService.CreateAsync(dto);

            //return Ok();
            var vendorId = await _vendorService.CreateAsync(dto);

            return Ok(vendorId);
        }


        [PermissionAuthorize("Vendor.Edit")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
             int id, UpdateVendorDto dto)
        {
            await _vendorService.UpdateAsync(id, dto);

            return NoContent();
        }


        [PermissionAuthorize("Vendor.Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _vendorService.DeleteAsync(id);

            //return Ok("Vendor deleted successfully");
            return NoContent();
        }


        [PermissionAuthorize("Vendor.Activate")]
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> Activate(int id)
        {
            await _vendorService.ActivateAsync(id);

            return NoContent();
        }


        [PermissionAuthorize("Vendor.Deactivate")]
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(int id)
        {
            await _vendorService.DeactivateAsync(id);

            return NoContent();
        }

        [PermissionAuthorize("Vendor.View")]
        [HttpGet("paged")]
        public async Task<IActionResult>GetPaged([FromQuery]VendorQueryParams query)
        {
            var result =
                await _vendorService
                    .GetPagedAsync(query);

            return Ok(result);
        }

        [PermissionAuthorize("Vendor.ViewDetails")]
        [HttpGet("{id}/contracts")]
        public async Task<IActionResult>GetContracts(int id)
        {
            var result =
                await _vendorService
                    .GetContractsAsync(id);

            return Ok(result);
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpGet("{id}/documents")]
        public async Task<IActionResult> GetDocuments(int id)
        {
            return Ok(
                await _vendorService
                    .GetDocumentsAsync(id));
        }
    }
}