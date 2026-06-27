using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations.AppDb
{
    /// <inheritdoc />
    public partial class AddVendorUserMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id");
        }
    }
}
