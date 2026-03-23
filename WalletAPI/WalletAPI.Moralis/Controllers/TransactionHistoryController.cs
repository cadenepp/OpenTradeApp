using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WalletAPI.Domain.Models;

namespace WalletAPI.Moralis.Controllers;

public class TransactionHistoryController : Controller
{
    private readonly string _apiBaseUrl = "https://api.moralis.com/";

    private HttpClient _client;

    public TransactionHistoryController()
    {
        _client = new HttpClient();
        _client.BaseAddress = new Uri(_apiBaseUrl);
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<IActionResult> GetRawJson()
    {
        var response = await _client.GetAsync(_apiBaseUrl);
        var data = string.Empty;

        if (response.IsSuccessStatusCode)
        {
            data = await response.Content.ReadAsStringAsync();
        }
        
        return Json(data);
    }

    public async Task<ActionResult> GetTransactions()
    {
        List<TransactionHistory> transactions;

        var responseMessage = await _client.GetAsync(_apiBaseUrl);

        if (responseMessage.IsSuccessStatusCode)
        {
            var responseData = responseMessage.Content.ReadAsStringAsync().Result;

            transactions = JsonConvert.DeserializeObject<List<TransactionHistory>>(responseData);
        }
        else
        {
            throw new HttpRequestException(responseMessage.ReasonPhrase);
        }
        

        return Ok(transactions);
    }
}