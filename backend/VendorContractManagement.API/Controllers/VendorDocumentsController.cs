using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VendorDocumentsController : ControllerBase
    {
        private readonly IVendorDocumentService _service;

        public VendorDocumentsController(
            IVendorDocumentService service)
        {
            _service = service;
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpGet("vendor/{vendorId}")]
        public async Task<IActionResult> GetByVendor(
            int vendorId)
        {
            return Ok(
                await _service.GetByVendorIdAsync(vendorId));
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(
            [FromForm] VendorDocumentUploadRequest request)
        {
            return Ok(
                await _service.UploadAsync(request));
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpGet("{id}/download")]
        public async Task<IActionResult> Download(
            int id)
        {
            var document =
                await _service.GetByIdAsync(id);

            if (document == null)
                return NotFound();

            var bytes =
                await _service.DownloadAsync(id);

            return File(
                bytes,
                document.ContentType,
                document.OriginalFileName);
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpGet("{id}/preview")]
        public async Task<IActionResult> Preview(int id)
        {
            var document =
                await _service.GetByIdAsync(id);

            if (document == null)
                return NotFound();

            var bytes =
                await _service.DownloadAsync(id);

            return File(
                bytes,
                document.ContentType
            );
        }

        [PermissionAuthorize("Vendor.Documents")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            int id)
        {
            await _service.DeleteAsync(id);

            return NoContent();
        }
    }
}