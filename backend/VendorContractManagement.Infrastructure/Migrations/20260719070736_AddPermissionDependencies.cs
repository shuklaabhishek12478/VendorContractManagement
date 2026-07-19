using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPermissionDependencies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PermissionDependencies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionCode = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    DependsOnPermissionCode = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionDependencies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermissionDependencies_PermissionCode_DependsOnPermissionCode",
                table: "PermissionDependencies",
                columns: new[] { "PermissionCode", "DependsOnPermissionCode" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionDependencies");
        }
    }
}
