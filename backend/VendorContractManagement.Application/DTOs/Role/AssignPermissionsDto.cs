using System.ComponentModel.DataAnnotations;

namespace VendorContractManagement.Application.DTOs.Role;

public class AssignPermissionsDto
{
    [MinLength(1,
        ErrorMessage = "Select at least one permission.")]
    public List<int> PermissionIds { get; set; }
        = new();
}