namespace VendorContractManagement.Application.DTOs
{
    public class PermissionExportDto
    {
        public string Module { get; set; } = string.Empty;

        public string PermissionCode { get; set; } = string.Empty;

        public string PermissionName { get; set; } = string.Empty;

        public bool Assigned { get; set; }
    }
}