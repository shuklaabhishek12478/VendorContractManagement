using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize(Roles = "Admin")]
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


        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vendors = await _vendorService.GetAllAsync();

            return Ok(vendors);
        }


        [Authorize(Roles = "Admin,Manager,Viewer")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var vendor = await _vendorService.GetByIdAsync(id);

            if (vendor == null)
                return NotFound();

            return Ok(vendor);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateVendorDto dto)
        {
            await _vendorService.CreateAsync(dto);

            return Ok();
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
             int id, UpdateVendorDto dto)
        {
            await _vendorService.UpdateAsync(id, dto);

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _vendorService.DeleteAsync(id);

            return Ok("Vendor deleted successfully");
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> Activate(int id)
        {
            await _vendorService.ActivateAsync(id);

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(int id)
        {
            await _vendorService.DeactivateAsync(id);

            return NoContent();
        }


        [HttpGet("paged")]
        public async Task<IActionResult>GetPaged([FromQuery]VendorQueryParams query)
        {
            var result =
                await _vendorService
                    .GetPagedAsync(query);

            return Ok(result);
        }


        [HttpGet("{id}/contracts")]
        public async Task<IActionResult>GetContracts(int id)
        {
            var result =
                await _vendorService
                    .GetContractsAsync(id);

            return Ok(result);
        }
    }
}