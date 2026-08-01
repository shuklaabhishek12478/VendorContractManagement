using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VendorContractManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserApprovalWorkflowNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
