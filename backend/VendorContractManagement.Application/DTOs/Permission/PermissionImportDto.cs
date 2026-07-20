namespace VendorContractManagement.Application.DTOs;

public class PermissionImportDto
{
    public int TotalRows { get; set; }

    public int Assigned { get; set; }

    public int Removed { get; set; }

    public int Skipped { get; set; }

    public List<string> Errors { get; set; } = new();
}