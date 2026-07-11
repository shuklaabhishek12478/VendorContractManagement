using Microsoft.EntityFrameworkCore;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Infrastructure.Repository.Implementations
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly AppDbContext _context;

        public DocumentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Document>> GetByContractIdAsync(int contractId)
        {
            return await _context.Documents
                .Where(d => d.ContractId == contractId)
                .ToListAsync();
        }

        public async Task<Document?> GetByIdAsync(int id)
        {
            return await _context.Documents
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task AddAsync(Document document)
        {
            await _context.Documents.AddAsync(document);
        }

        public void Delete(Document document)
        {
            _context.Documents.Remove(document);
        }

        public async Task<IEnumerable<Document>> GetAllAsync()
        {
            return await _context.Documents.ToListAsync();
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Documents.CountAsync();
        }

        public async Task<int>CountByVendorIdAsync(int vendorId)
        {
            return await _context.Documents
                .CountAsync(x =>
                    x.Contract.VendorId == vendorId);
        }

        public async Task<Document?> GetByIdWithContractAsync(int id)
        {
            return await _context.Documents
                .Include(x => x.Contract)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Document>> GetByContractIdsAsync(
    List<int> contractIds)
        {
            return await _context.Documents
                .Where(x => contractIds.Contains(x.ContractId))
                .OrderByDescending(x => x.UploadedOn)
                .ToListAsync();
        }
    }
}