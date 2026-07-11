using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Domain.Entities
{
    public class RecentActivity
    {
        public int Id { get; set; }

        public string Module { get; set; } = string.Empty;
        // Vendor, Contract, Renewal, Document

        public string Action { get; set; } = string.Empty;
        // Created, Updated, Approved, Rejected, Activated

        public string Description { get; set; } = string.Empty;

        public int? EntityId { get; set; }

        public string EntityName { get; set; } = string.Empty;

        public string? EntityType { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public string? PerformedBy { get; set; }

        
    }
}
