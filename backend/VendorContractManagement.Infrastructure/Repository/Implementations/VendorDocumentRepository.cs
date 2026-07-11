using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations
{
    public class VendorDocumentRepository
        : IVendorDocumentRepository
    {
        private readonly AppDbContext _context;

        public VendorDocumentRepository(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<VendorDocument>> GetByVendorIdAsync(
            int vendorId)
        {
            return await _context.VendorDocuments
                .Where(x => x.VendorId == vendorId)
                .OrderByDescending(x => x.UploadedOn)
                .ToListAsync();
        }

        public async Task<VendorDocument?> GetByIdAsync(
            int id)
        {
            return await _context.VendorDocuments
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddAsync(
            VendorDocument document)
        {
            await _context.VendorDocuments
                .AddAsync(document);
        }

        public void Delete(
            VendorDocument document)
        {
            _context.VendorDocuments.Remove(document);
        }
    }
}