using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WelcoWash.Migrations
{
    /// <inheritdoc />
    public partial class Refactored_NullableProperties_UnderEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmploymentEndDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmploymentStartDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AccountClosureDate",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "AccountStartDate",
                table: "Customers");

            migrationBuilder.AlterColumn<int>(
                name: "EmploymentStatus",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CustomerStatus",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "EmploymentStatus",
                table: "Employees",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateOnly>(
                name: "EmploymentEndDate",
                table: "Employees",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "EmploymentStartDate",
                table: "Employees",
                type: "date",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CustomerStatus",
                table: "Customers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateOnly>(
                name: "AccountClosureDate",
                table: "Customers",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "AccountStartDate",
                table: "Customers",
                type: "date",
                nullable: true);
        }
    }
}
