namespace WalletAPI.Domain.Models;

public class AccountBalance
{
    // EXPLANATIONS WRITTEN BY AI ;)
    
    public int Id { get; set; }
    
    // Smart contract address of the token (ERC-20)
    public string TokenAddress { get; set; }

    // Human-readable name of the token (e.g., "Kylin Network")
    public string Name { get; set; }

    // Token ticker symbol (e.g., KYL, USDT, DAI)
    public string Symbol { get; set; }

    // Number of decimal places the token uses (used to format balances correctly)
    public int Decimals { get; set; }

    // Raw token balance as returned by the blockchain (before applying decimals)
    public string Balance { get; set; }

    // Indicates whether the token is flagged as potential spam by the indexer
    public bool PossibleSpam { get; set; }

    // Indicates whether the token contract is verified on a block explorer
    public bool VerifiedContract { get; set; }
    
    // FK to User
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
}