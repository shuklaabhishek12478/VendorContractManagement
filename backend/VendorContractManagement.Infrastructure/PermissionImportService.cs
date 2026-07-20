using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure.Data;

namespace VendorContractManagement.Application.Services;

public class PermissionImportService
    : IPermissionImportService
{

    private readonly AppDbContext _context;
    private readonly IPermissionValidationService
    _permissionValidationService;
    public PermissionImportService(
        AppDbContext context,
        IPermissionValidationService permissionValidationService)
    {
        _context = context;
        _permissionValidationService = permissionValidationService;
    }
    public async Task<PermissionImportDto> ImportAsync(
    int roleId,
    IFormFile file)
    {
        var extension =
            Path.GetExtension(file.FileName)
                .ToLower();

        return extension switch
        {
            ".xlsx" => await ImportExcel(roleId, file),

            ".csv" => await ImportCsv(roleId, file),

            _ => throw new Exception(
                "Unsupported file format.")
        };
    }

    private async Task<PermissionImportDto> ImportExcel(
     int roleId,
     IFormFile file)
    {
        var result = new PermissionImportDto();

        using var stream = file.OpenReadStream();

        using var workbook = new XLWorkbook(stream);

        var worksheet = workbook.Worksheet(1);

        var rows = worksheet.RowsUsed().Skip(1).ToList();

        result.TotalRows = rows.Count;

        // Existing role permissions
        var existingRolePermissions = await _context.RolePermissions
            .Where(x => x.RoleId == roleId)
            .ToListAsync();

        foreach (var row in rows)
        {
            var permissionCode =
                row.Cell(2).GetString().Trim();

            var assigned =
                row.Cell(4).GetString().Trim()
                    .Equals("Yes",
                        StringComparison.OrdinalIgnoreCase);

            var permission = await _context.Permissions
                .FirstOrDefaultAsync(x => x.Code == permissionCode);

            if (permission == null)
            {
                result.Errors.Add(
                    $"Permission '{permissionCode}' not found.");

                result.Skipped++;

                continue;
            }

            var existing = existingRolePermissions
                .FirstOrDefault(x =>
                    x.PermissionId == permission.Id);

            if (assigned)
            {
                if (existing == null)
                {
                    _context.RolePermissions.Add(
                        new RolePermission
                        {
                            RoleId = roleId,
                            PermissionId = permission.Id
                        });

                    result.Assigned++;
                }
                else
                {
                    result.Skipped++;
                }
            }
            else
            {
                if (existing != null)
                {
                    _context.RolePermissions.Remove(existing);

                    result.Removed++;
                }
                else
                {
                    result.Skipped++;
                }
            }
        }

       /* var finalPermissionIds =
    await _context.RolePermissions
        .Where(x => x.RoleId == roleId)
        .Select(x => x.PermissionId)
        .ToListAsync();

        var validation =
            await _permissionValidationService
                .ValidateAsync(finalPermissionIds);

        if (!validation.IsValid)
        {
            throw new Exception(
                string.Join(
                    Environment.NewLine,
                    validation.Errors));
        }*/

        await _context.SaveChangesAsync();

        return result;
    }

    private async Task<PermissionImportDto>
    ImportCsv(
        int roleId,
        IFormFile file)
    {
        throw new NotImplementedException();
    }
}