namespace VendorContractManagement.Application.DTOs;

public class PermissionValidationResultDto
{
    public bool IsValid { get; set; }

    public List<string> Errors { get; set; } = new();
}