namespace VendorContractManagement.Application.DTOs.Role;

public class RoleDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Color { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public int Priority { get; set; }

    public bool IsSystemRole { get; set; }

    public bool IsActive { get; set; }

    public int UserCount { get; set; }

    public int PermissionCount { get; set; }
}