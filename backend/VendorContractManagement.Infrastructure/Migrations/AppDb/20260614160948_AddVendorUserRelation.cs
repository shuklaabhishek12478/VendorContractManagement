using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations.AppDb
{
    /// <inheritdoc />
    public partial class AddVendorUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VendorId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_VendorId",
                table: "Users",
                column: "VendorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Vendors_VendorId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_VendorId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VendorId",
                table: "Users");
        }
    }
}
