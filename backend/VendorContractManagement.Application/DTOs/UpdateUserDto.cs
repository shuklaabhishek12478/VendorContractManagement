namespace VendorContractManagement.Application.DTOs.Users;

public class UpdateUserDto
{
    public string FullName { get; set; } = string.Empty;

    

    public int? VendorId { get; set; }

    public bool IsActive { get; set; }

    public List<int> RoleIds { get; set; } = [];
}