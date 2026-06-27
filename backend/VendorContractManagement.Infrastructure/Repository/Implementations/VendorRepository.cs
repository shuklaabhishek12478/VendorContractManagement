using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;
using VendorContractManagement.Infrastructure.Persistence;
namespace VendorContractManagement.Infrastructure.Repository.Implementations
{
    public class VendorRepository : GenericRepository<Vendor>, IVendorRepository
    {
        private readonly AppDbContext _context;
        public VendorRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Vendor>> GetAllAsync()
        {
            return await _context.Vendors
                .Where(v => !v.IsDeleted)
                .ToListAsync();
        }

        public async Task<Vendor?> GetByIdAsync(int id)
        {
            return await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        }

        public async Task AddAsync(Vendor vendor)
        {
            await _context.Vendors.AddAsync(vendor);

        }

        public void Update(Vendor vendor)
        {
            _context.Vendors.Update(vendor);
            _context.SaveChanges();
        }

        public void Delete(Vendor vendor)
        {
            vendor.IsDeleted = true;
            _context.Vendors.Update(vendor);
            _context.SaveChanges();
        }

        public async Task<Vendor?> GetVendorWithContractsAsync(int id)
        {
            return await _context.Vendors
                .Include(v => v.Contracts)
                .FirstOrDefaultAsync(v => v.Id == id);
        }


        public async Task<Vendor?> GetByEmailAsync(string email)
        {
            return await _context.Vendors
                .FirstOrDefaultAsync(x =>
                    !x.IsDeleted &&
                    x.Email == email);
        }

        public async Task<Vendor?> GetByGSTAsync(string gstNumber)
        {
            return await _context.Vendors
                .FirstOrDefaultAsync(x =>
                    !x.IsDeleted &&
                    x.GSTNumber == gstNumber);
        }

        public async Task<Vendor?> GetByPANAsync(string panNumber)
        {
            return await _context.Vendors
                .FirstOrDefaultAsync(x =>
                    !x.IsDeleted &&
                    x.PANNumber == panNumber);
        }

        public async Task<(IEnumerable<Vendor>, int)>
    GetPagedAsync(VendorQueryParams query)
        {
            var vendors = _context.Vendors
                .AsNoTracking()
                .Where(x => !x.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                vendors = vendors.Where(x =>
                    x.VendorName.Contains(query.Search)
                    ||
                    x.CompanyName.Contains(query.Search)
                    ||
                    x.Email.Contains(query.Search));
            }

            var totalCount =
                await vendors.CountAsync();

            var result =
                await vendors
                    .OrderByDescending(x => x.Id)
                    .Skip((query.PageNumber - 1)
                            * query.PageSize)
                    .Take(query.PageSize)
                    .ToListAsync();

            return (result, totalCount);
        }
    }
}
