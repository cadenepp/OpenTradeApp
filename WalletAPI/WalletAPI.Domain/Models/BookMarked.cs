namespace WalletAPI.Domain.Models;

public class BookMarked
{
    public int Id { get; set; }
    public AccountBalance AccountBalance { get; set; }
    public TransactionHistory TransactionHistory { get; set; }
    public DateTime DateMarked { get; set; }
    
}