using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Services.Interfaces;

namespace VendorContractManagement.API.Controllers
{
    [Authorize(Roles = "Admin,Manager,Vendor,Viewer")]
    [EnableRateLimiting("fixed")]
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet("contract/{contractId}")]
        public async Task<IActionResult> GetByContractId(int contractId)
        {
            return Ok(await _documentService.GetByContractIdAsync(contractId));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(int contractId, IFormFile file)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);

            var dto = new DocumentUploadDto
            {
                ContractId = contractId,
                FileName = file.FileName,
                FileContent = ms.ToArray(),
                ContentType = file.ContentType
            };

            var result = await _documentService.UploadAsync(dto);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            var result = await _documentService.DownloadAsync(id);

            if (result == null)
                return NotFound();

            return File(result.Value.file, result.Value.contentType, result.Value.fileName);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _documentService.DeleteAsync(id);

            if (!result)
                return NotFound();

            return Ok("Deleted successfully");
        }
    }
}