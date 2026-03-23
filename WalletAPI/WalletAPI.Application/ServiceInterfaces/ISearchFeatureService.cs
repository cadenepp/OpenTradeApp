using WalletAPI.Application.DTOs;

namespace WalletAPI.Application.ServiceInterfaces;

public interface ISearchFeatureService
{
    Task<List<TransactionDto2>> GetNativeTransactionsAsync (string address, int limit, string chain = "eth", string order = "DESC");
}