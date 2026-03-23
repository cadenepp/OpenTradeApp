using Microsoft.EntityFrameworkCore.Infrastructure;
using WalletAPI.Domain.Interfaces;
using WalletAPI.Domain.Models;
using WalletAPI.Infrastructure.Data;

namespace WalletAPI.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly WalletDbContext _context;

    public UserRepository(WalletDbContext db) : base(db)
    {
        _context = db;
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users.FindAsync(id ,cancellationToken);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);
    }
}