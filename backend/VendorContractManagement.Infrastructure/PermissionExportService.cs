using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Infrastructure.Data;
using VendorContractManagement.Infrastructure.Repository.Interfaces;

namespace VendorContractManagement.Infrastructure.Services
{
    public class PermissionExportService : IPermissionExportService
    {
        private readonly AppDbContext _context;

        public PermissionExportService(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> ExportRolePermissionsAsync(int roleId)
        {
            var role = await _context.Roles
                .Include(x => x.RolePermissions)
                .FirstOrDefaultAsync(x => x.Id == roleId);

            if (role == null)
                throw new Exception("Role not found.");

            var permissions = await _context.Permissions
                .OrderBy(x => x.Module)
                .ThenBy(x => x.Name)
                .ToListAsync();

            using var workbook = new XLWorkbook();

            var worksheet =
                workbook.Worksheets.Add("Permission Matrix");

            // Header
            worksheet.Cell(1, 1).Value = "Module";
            worksheet.Cell(1, 2).Value = "Permission Code";
            worksheet.Cell(1, 3).Value = "Permission Name";
            worksheet.Cell(1, 4).Value = "Assigned";

            var header =
                worksheet.Range(1, 1, 1, 4);

            header.Style.Font.Bold = true;
            header.Style.Fill.BackgroundColor = XLColor.CornflowerBlue;
            header.Style.Font.FontColor = XLColor.White;
            header.Style.Alignment.Horizontal =
                XLAlignmentHorizontalValues.Center;

            int row = 2;

            foreach (var permission in permissions)
            {
                worksheet.Cell(row, 1).Value = permission.Module;
                worksheet.Cell(row, 2).Value = permission.Code;
                worksheet.Cell(row, 3).Value = permission.Name;

                worksheet.Cell(row, 4).Value =
                    role.RolePermissions.Any(x =>
                        x.PermissionId == permission.Id)
                    ? "Yes"
                    : "No";

                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }

        public async Task<byte[]> ExportCsvAsync(int roleId)
        {
            var role = await _context.Roles
                .Include(x => x.RolePermissions)
                    .ThenInclude(x => x.Permission)
                .FirstAsync(x => x.Id == roleId);

            var sb = new StringBuilder();

            sb.AppendLine("Module,Permission,Description");

            foreach (var rp in role.RolePermissions)
            {
                sb.AppendLine(
                    $"{rp.Permission.Module}," +
                    $"{rp.Permission.Code}," +
                    $"{rp.Permission.Description}");
            }

            return Encoding.UTF8.GetBytes(sb.ToString());
        }

        public async Task<byte[]> ExportJsonAsync(int roleId)
        {
            var role = await _context.Roles
                .Include(x => x.RolePermissions)
                    .ThenInclude(x => x.Permission)
                .FirstAsync(x => x.Id == roleId);

            var result = new
            {
                Role = role.Name,

                Permissions = role.RolePermissions
                    .Select(x => new
                    {
                        x.Permission.Module,
                        x.Permission.Code,
                        x.Permission.Description
                    })
            };

            var json = JsonSerializer.Serialize(

                result,

                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

            return Encoding.UTF8.GetBytes(json);
        }
    }
}