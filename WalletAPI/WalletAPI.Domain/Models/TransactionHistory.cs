namespace WalletAPI.Domain.Models;

public class TransactionHistory
{
    // EXPLANATIONS WRITTEN BY AI ;)
    public int Id { get; set; }
    
    // Unique transaction identifier on a specific blockchain
    public string Hash { get; set; }

    // Block number where the transaction was included (used for ordering & confirmations)
    public long BlockNumber { get; set; }

    // UTC timestamp of when the block containing this transaction was mined
    public DateTime Timestamp { get; set; }

    // Sender wallet or contract address
    public string From { get; set; }

    // Receiver wallet or contract address (can be a smart contract)
    public string To { get; set; }

    // Amount of the chain's native currency transferred (ETH, MATIC, BNB, etc.)
    public decimal Value { get; set; }

    // Indicates whether the transaction executed successfully (true) or reverted (false)
    public bool Success { get; set; }

    // EVM chain identifier (e.g., 1 = Ethereum, 137 = Polygon, 56 = BNB Chain)
    // Used to distinguish transactions across different blockchain networks
    public int ChainId { get; set; }
    
    // FK to User
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}