using WalletAPI.Application.ServiceInterfaces;
using WalletAPI.Application.Services;
using WalletAPI.Client.Components;
using WalletAPI.Domain.Interfaces;
using WalletAPI.Infrastructure;
using WalletAPI.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();




// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// added these 2 for injecting my service in pages
builder.Services.AddScoped<BalanceService>();
builder.Services.AddHttpClient<BalanceService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:5081/");
});

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddHttpClient<ISearchFeatureService, SearchFeatureService>();
builder.Services.AddHttpClient<IBookedMarkedService, BookmarkService>();

builder.Services.AddInfrastructure(
    dbConn: "Data Source=walletapi.db"
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();