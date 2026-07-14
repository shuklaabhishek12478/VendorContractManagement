namespace VendorContractManagement.Application.DTOs.Role;

public class RoleFilterDto
{
    public string? Search { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsSystemRole { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}