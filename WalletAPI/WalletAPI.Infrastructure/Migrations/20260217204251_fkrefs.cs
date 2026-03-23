using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WalletAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class fkrefs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccountBalances_Users_UserId",
                table: "AccountBalances");

            migrationBuilder.DropForeignKey(
                name: "FK_TransactionHistory_AccountBalances_AccountBalanceId",
                table: "TransactionHistory");

            migrationBuilder.DropIndex(
                name: "IX_TransactionHistory_AccountBalanceId",
                table: "TransactionHistory");

            migrationBuilder.DropColumn(
                name: "AccountBalanceId",
                table: "TransactionHistory");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TransactionHistory",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AccountBalances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_UserId",
                table: "TransactionHistory",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccountBalances_Users_UserId",
                table: "AccountBalances",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionHistory_Users_UserId",
                table: "TransactionHistory",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccountBalances_Users_UserId",
                table: "AccountBalances");

            migrationBuilder.DropForeignKey(
                name: "FK_TransactionHistory_Users_UserId",
                table: "TransactionHistory");

            migrationBuilder.DropIndex(
                name: "IX_TransactionHistory_UserId",
                table: "TransactionHistory");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TransactionHistory");

            migrationBuilder.AddColumn<int>(
                name: "AccountBalanceId",
                table: "TransactionHistory",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AccountBalances",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_AccountBalanceId",
                table: "TransactionHistory",
                column: "AccountBalanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccountBalances_Users_UserId",
                table: "AccountBalances",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionHistory_AccountBalances_AccountBalanceId",
                table: "TransactionHistory",
                column: "AccountBalanceId",
                principalTable: "AccountBalances",
                principalColumn: "Id");
        }
    }
}
