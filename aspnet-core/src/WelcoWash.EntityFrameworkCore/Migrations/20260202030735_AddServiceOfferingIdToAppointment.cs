using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WelcoWash.Migrations
{
    /// <inheritdoc />
    public partial class AddServiceOfferingIdToAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_ServiceOfferings_ServiceOfferingId",
                table: "Appointments");

            migrationBuilder.AlterColumn<Guid>(
                name: "ServiceOfferingId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_ServiceOfferings_ServiceOfferingId",
                table: "Appointments",
                column: "ServiceOfferingId",
                principalTable: "ServiceOfferings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_ServiceOfferings_ServiceOfferingId",
                table: "Appointments");

            migrationBuilder.AlterColumn<Guid>(
                name: "ServiceOfferingId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_ServiceOfferings_ServiceOfferingId",
                table: "Appointments",
                column: "ServiceOfferingId",
                principalTable: "ServiceOfferings",
                principalColumn: "Id");
        }
    }
}
