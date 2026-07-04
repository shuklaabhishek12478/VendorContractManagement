using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddContractIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Contracts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Contracts");
        }
    }
}
