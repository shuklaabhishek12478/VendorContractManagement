namespace VendorContractManagement.Application.DTOs
{
    public class AuditLogExportDto
    {
        public string Action { get; set; }
        public string EntityName { get; set; }
        public int EntityId { get; set; }
        public string PerformedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}