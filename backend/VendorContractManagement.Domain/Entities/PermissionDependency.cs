using VendorContractManagement.Domain.Entities;

public class PermissionDependency
{
    public int Id { get; set; }

    public int PermissionId { get; set; }

    public int DependsOnPermissionId { get; set; }

    public Permission Permission { get; set; } = null!;

    public Permission DependsOnPermission { get; set; } = null!;
}