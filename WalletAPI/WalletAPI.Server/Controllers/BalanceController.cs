using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WalletAPI.Moralis.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BalanceController : ControllerBase
{
    private IConfiguration _config;
    // Testing ETH chain wallet ID: 0xa9049755409f9e48Be7f699689bCfEC1F8B78064
    private readonly string _apiBaseUrl = "https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens";
    private readonly string _apiBaseUrl1 = "https://deep-index.moralis.io/api/v2.2/wallets/";
    private readonly string _apiBaseUrl2 = "/tokens?chain=eth&limit=25";

    private readonly HttpClient _client;

    private record ErrorResponse(int Status, string Content, string UriUsed);
    
    private record GoodRequest(ResultsList ParsedData);
    
    private record ResultsList(List<BalanceDto> result);
    
    private record BalanceDto(string token_address, string name, string symbol, string balance_formatted, bool possible_spam,  bool verified_contract);

    public BalanceController(IConfiguration config)
    {
        _client = new HttpClient();
        _config = config;
        
        _client.BaseAddress = new Uri(_apiBaseUrl);
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Add("X-API-Key",_config["WalletAPI:ApiKey"]);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    [HttpGet("getbalance")]
    public async Task<IActionResult> GetParsedJson(string address)
    {
        var response = await _client.GetAsync(_apiBaseUrl1 + address + _apiBaseUrl2);
        var data = string.Empty;
        ResultsList results;

        if (response.IsSuccessStatusCode)
        {
            data = await response.Content.ReadAsStringAsync();
            results = JsonConvert.DeserializeObject<ResultsList>(data);
        }
        else
        {
            return BadRequest(new ErrorResponse(
                (int)response.StatusCode,
                response.Content.ReadAsStringAsync().Result,
                response.Headers.ToString()) );
        }
        
        Console.WriteLine("SENDING DATA!!!");
        return Ok(new GoodRequest(results));
    }
}