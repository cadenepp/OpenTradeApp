namespace WalletAPI.Application.DTOs;

public class TransactionDto
{
    public string Hash { get; set; }

    public long Block_Number { get; set; }

    public DateTime Timestamp { get; set; }

    public string From { get; set; }

    public string To { get; set; }

    public decimal Value { get; set; }

    public bool Success { get; set; }
    
    public int ChainId { get; set; }
}