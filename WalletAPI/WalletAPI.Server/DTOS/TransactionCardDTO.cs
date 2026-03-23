namespace WalletAPI.Application.DTOs;


public class TransactionCardDTO
{
    public string hash { get; set; }
    public string block_number  { get; set; }
    public string block_timestamp  { get; set; }
    public List<Level2v3> native_transfers  { get; set; }
}

public class Level2v3
{
    public string from_address  { get; set; }
    public string to_address   { get; set; }
    public string value   { get; set; }
    public bool sucess  { get; set; }
    public string token_symbol { get; set; }
};

    public record Erc20Transfer(
        string token_name,
        string token_symbol,
        string? token_logo,
        string token_decimals,
        string? from_address_entity,
        string? from_address_entity_logo,
        string from_address,
        string? from_address_label,
        string? to_address_entity,
        string? to_address_entity_logo,
        string to_address,
        string? to_address_label,
        string address,
        int log_index,
        string value,
        bool possible_spam,
        bool verified_contract,
        int security_score,
        string direction,
        string value_formatted
    );
    
    public record NftTransfer(
        int log_index,
        string value,
        string token_name,
        string token_symbol,
        string contract_type,
        string transaction_type,
        string token_address,
        string token_id,
        string from_address,
        string? from_address_entity,
        string? from_address_entity_logo,
        string? from_address_label,
        string to_address,
        string? to_address_entity,
        string? to_address_entity_logo,
        string? to_address_label,
        string amount,
        bool possible_spam,
        bool verified_collection,
        string direction
    );
    


    // private record (
    //     string hash,
    //     string block_number,
    //     string block_timestamp,
    //     List<Level2v2>? native_transfers,
    //     List<NftTransfer>? nft_transfers,
    //     List<Erc20Transfer>? erc20_transfers);
    
    public record TransactionDto2(
        string hash,
        string nonce,
        string transaction_index,
        string? from_address_entity,
        string? from_address_entity_logo,
        string from_address,
        string? from_address_label,
        string? to_address_entity,
        string? to_address_entity_logo,
        string? to_address,
        string? to_address_label,
        string value,
        string gas,
        string gas_price,
        string receipt_cumulative_gas_used,
        string receipt_gas_used,
        string? receipt_contract_address,
        string receipt_status,
        DateTime block_timestamp,
        string block_number,
        string block_hash,
        string transaction_fee,
        string? method_label,
        List<NftTransfer> nft_transfers,
        List<Erc20Transfer> erc20_transfers,
        List<object> native_transfers,  // or create a NativeTransfer record if needed
        string summary,
        bool possible_spam,
        string category
    );