using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities;

public class PermissionDependency : BaseEntity
{
    public string PermissionCode { get; set; } = string.Empty;

    public string DependsOnPermissionCode { get; set; } = string.Empty;
}