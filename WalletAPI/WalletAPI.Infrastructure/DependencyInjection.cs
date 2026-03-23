using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WalletAPI.Domain.Interfaces;
using WalletAPI.Infrastructure.Data;
using WalletAPI.Infrastructure.Repositories;

namespace WalletAPI.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string dbConn)
    {
        services.AddDbContext<WalletDbContext>(o => o.UseSqlite(dbConn));
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        return services;
    }
}