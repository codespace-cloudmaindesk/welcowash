using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WelcoWash.Migrations
{
    /// <inheritdoc />
    public partial class AddIsSubscriptionUsedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSubscriptionUsed",
                table: "Appointments",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSubscriptionUsed",
                table: "Appointments");
        }
    }
}
