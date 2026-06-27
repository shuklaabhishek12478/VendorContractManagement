using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities
{
    public class AuditLog : BaseEntity
    {
        public string Action { get; set; } = string.Empty;

        public string EntityName { get; set; } = string.Empty;

        public int EntityId { get; set; }

        public string PerformedBy { get; set; } = string.Empty;

        public string? OldValues { get; set; }

        public string? NewValues { get; set; }
    }
}