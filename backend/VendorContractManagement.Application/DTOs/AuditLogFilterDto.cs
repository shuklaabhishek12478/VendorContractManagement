namespace VendorContractManagement.Application.DTOs
{
    public class AuditLogFilterDto
    {
        public string? UserId { get; set; }

        public string? EntityName { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string? Search { get; set; }
    }
}