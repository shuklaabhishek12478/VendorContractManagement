using Microsoft.AspNetCore.Mvc;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
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

        [HttpGet("vendor/{vendorId}")]
        public async Task<IActionResult> GetByVendor(
            int vendorId)
        {
            return Ok(
                await _service.GetByVendorIdAsync(vendorId));
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(
            [FromForm] VendorDocumentUploadRequest request)
        {
            return Ok(
                await _service.UploadAsync(request));
        }

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            int id)
        {
            await _service.DeleteAsync(id);

            return NoContent();
        }
    }
}