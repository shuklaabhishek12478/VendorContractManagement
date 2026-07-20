namespace VendorContractManagement.Application.DTOs.Users;

public class UserDetailsDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? PhoneNumber { get; set; }

    public int? VendorId { get; set; }

    public string? VendorName { get; set; }

    public bool IsActive { get; set; }

    public bool IsLocked { get; set; }

    public DateTime? LastLogin { get; set; }

    public List<int> RoleIds { get; set; } = [];

    public List<string> Roles { get; set; } = [];
}