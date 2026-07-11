using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IVendorDocumentRepository
    {
        Task<List<VendorDocument>> GetByVendorIdAsync(int vendorId);

        Task<VendorDocument?> GetByIdAsync(int id);

        Task AddAsync(VendorDocument document);

        void Delete(VendorDocument document);
    }
}
