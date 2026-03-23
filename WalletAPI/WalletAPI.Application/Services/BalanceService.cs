using Newtonsoft.Json.Linq;
using WalletAPI.Application.DTOs;


namespace WalletAPI.Application.Services;

public class BalanceService
{
    //private readonly IRepository<AccountBalance> _repository;
    private readonly HttpClient _http;
    private List<BalanceDto> _balances;

    public BalanceService(/*IRepository<AccountBalance> repository,*/HttpClient http)
    {
        //_repository = repository;
        _http = http;
    }
    
    public async Task<List<BalanceDto>> GetBalances(string address)
    {
        var url = $"http://localhost:5081/api/balance/getbalance?address={address}";
        try
        {
            var response = await _http.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("Error: " + response.StatusCode + " - GetBalances: " + response.ReasonPhrase);
                return null;
            }

            var jsonString = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrWhiteSpace(jsonString)) return null;

            var json = JObject.Parse(jsonString);
            var parsedData = json["parsedData"] ?? new JObject();
            var results = parsedData["result"] ?? new JObject();

            if (results == null)
            {
                Console.WriteLine("Error: " + response.StatusCode + " - GetBalances: " + jsonString);
                return null;
            }
            
            _balances = results.ToObject<List<BalanceDto>>();
            Console.WriteLine(results);
            return results.ToObject<List<BalanceDto>>();
        }
        catch (Exception e)
        {
            Console.WriteLine("Exception in Parsing GET request for balances: " + e);
            return null;
        }
    }
    
    
}