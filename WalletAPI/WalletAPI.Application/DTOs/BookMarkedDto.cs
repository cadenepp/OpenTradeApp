namespace WalletAPI.Application.DTOs;

public class BookMarkedDto
{
    public BalanceDto AccountBalance { get; set; }
    public TransactionDto2 TransactionHistory { get; set; }
    public DateTime DateMarked { get; set; }

}