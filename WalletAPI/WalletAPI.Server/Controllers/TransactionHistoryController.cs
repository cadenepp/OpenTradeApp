using System.Net.Http.Headers;
using System.Text.Json;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WalletAPI.Application.DTOs;


namespace WalletAPI.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionHistoryController : ControllerBase
{
    
    private IConfiguration _config;
    // Replace to add parameters on to it later to make it more dynamic
    private readonly string _apiBaseUrl = "https://deep-index.moralis.io/api/v2.2";

    private readonly HttpClient _client;

    private record ErrorResponse(int Status, string Content, string UriUsed);

    private record GoodRequest(string originalData, Level1 ParsedData);

    private record Level1(int page_size, int page, int limit, List<TransactionDto2> result);
    private record Level2v2(string from_address, string to_address, string value,[property: JsonProperty("receipt_status")] bool? success, string token_symbol);
    
    public TransactionHistoryController(IConfiguration config)
    {
        _client = new HttpClient();
        _config = config;
        
        _client.BaseAddress = new Uri(_apiBaseUrl);
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Add("X-API-Key",_config["WalletAPI:ApiKey"]);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }


    [HttpGet("getrawjson")]
    public async Task<IActionResult> GetRawJson()
    {
        
        var response = await _client.GetAsync(_apiBaseUrl);
        var data = string.Empty;

        if (response.IsSuccessStatusCode)
        {
            data = await response.Content.ReadAsStringAsync();
            
        }
        else
        {
            return BadRequest(new ErrorResponse(
                (int)response.StatusCode,
                response.Content.ReadAsStringAsync().Result,
                response.Headers.ToString()) );
        }
        
        return Ok(data);
    }
    
    // <summary>
    ///     Create URI for Moralias API call
    /// </summary>
    /// <param name="addressParam"> Address to the wallet</param>
    /// <param name="limitParam"> API limit </param>
    /// <param name="chainParam"> Chain name default etn</param>
    /// <param name="orderParam"> Order DESC</param>
    /// <returns>Formatted Morlais API</returns>
    [NonAction]
    public Uri FormatUri(string addressParam, int limitParam, string chainParam, string orderParam)
    {
        var uriBuilder = new UriBuilder($"{_apiBaseUrl}/{addressParam}");
        var query = HttpUtility.ParseQueryString(uriBuilder.Query);

        query["limit"] = limitParam.ToString();
        query["chain"] = chainParam;
        query["order"] = orderParam;

        uriBuilder.Query = query.ToString();

        return uriBuilder.Uri;
    }

    [HttpGet("getparsejson/{addressParam}/{limitParam}/{chainParam}/{orderParam}")]
    public async Task<IActionResult> GetParseJsonV2(string addressParam, int limitParam, string chainParam,
        string orderParam)
    {
        // Console.WriteLine("Got to Server");
        var url = FormatUri(addressParam, limitParam, chainParam, orderParam);

        var response = await _client.GetAsync(url);
        var data = string.Empty;
        Level1 transactions;

        if (response.IsSuccessStatusCode)
        {
            data = await response.Content.ReadAsStringAsync();
            transactions = JsonConvert.DeserializeObject<Level1>(data);
            Console.WriteLine(transactions?.result[0]);

        }
        else
        {
            return BadRequest(new ErrorResponse((int)response.StatusCode, response.Content.ReadAsStringAsync().Result,
                response.Headers.ToString()));
        }

        return Ok(new GoodRequest(string.Empty, 
                                            transactions ?? new Level1(
                                                                        page_size:0, 
                                                                        page:0, 
                                                                        limit:0, 
                                                                        result:new List<TransactionDto2>()
                                                                        )));
    }
}