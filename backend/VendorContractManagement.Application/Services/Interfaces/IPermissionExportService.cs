namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IPermissionExportService
    {
        Task<byte[]> ExportRolePermissionsAsync(int roleId);
        Task<byte[]> ExportCsvAsync(int roleId);

        Task<byte[]> ExportJsonAsync(int roleId);
    }
}