using System.ComponentModel.DataAnnotations;

namespace VendorContractManagement.Application.DTOs.Role;

public class UpdateRoleDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Color { get; set; } = "#2563EB";

    [MaxLength(100)]
    public string Icon { get; set; } = "shield";

    public int Priority { get; set; }

    public bool IsActive { get; set; }
}