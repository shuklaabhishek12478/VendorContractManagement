using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities;

public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Color { get; set; } = "#2563EB";

    public string Icon { get; set; } = "shield";

    public int Priority { get; set; }

    public bool IsSystemRole { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<UserRole> UserRoles { get; set; }
        = new List<UserRole>();

    public ICollection<RolePermission> RolePermissions { get; set; }
        = new List<RolePermission>();
}