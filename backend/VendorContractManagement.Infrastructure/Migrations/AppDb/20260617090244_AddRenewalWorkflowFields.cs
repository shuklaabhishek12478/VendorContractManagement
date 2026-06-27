using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations.AppDb
{
    /// <inheritdoc />
    public partial class AddRenewalWorkflowFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRenewal",
                table: "Contracts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "RenewalApprovedBy",
                table: "Contracts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RenewalApprovedOn",
                table: "Contracts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RenewalRequestedOn",
                table: "Contracts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRenewal",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "RenewalApprovedBy",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "RenewalApprovedOn",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "RenewalRequestedOn",
                table: "Contracts");
        }
    }
}
