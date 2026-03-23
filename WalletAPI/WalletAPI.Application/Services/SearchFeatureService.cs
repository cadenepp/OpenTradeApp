using System.Net.Http.Json;
using WalletAPI.Application.DTOs;
using WalletAPI.Application.ServiceInterfaces;

namespace WalletAPI.Application.Services;

public class SearchFeatureService : ISearchFeatureService
{
    private readonly HttpClient _client;
    private record GoodRequest(string originalData, Level1 ParsedData);
    private record Level1(int pageSize, int page, int limit, List<TransactionDto2> result);


    public SearchFeatureService(HttpClient client)
    {
        _client = client;
    }

    // call Server receive external API data
    public async Task<List<TransactionDto2>> GetNativeTransactionsAsync(string address, int limit=1, string chain="eth",
        string order = "DESC")
    {
        // Console.WriteLine($"Address: {address}\nLimit: {limit}\nChain: {chain}\norder: {order}");
        // Console.WriteLine("Got to SF Service");

        var response =
            await _client.GetFromJsonAsync<GoodRequest>(
                $"http://localhost:5081/api/TransactionHistory/getparsejson/{address}/{limit}/{chain}/{order}");
        Console.WriteLine($"SF Response: {response?.ParsedData.result}");


        return response?.ParsedData.result ?? new List<TransactionDto2>();
    }

    // parse + logic -> return data front-end
}