using Microsoft.EntityFrameworkCore;
using WalletAPI.Domain.Interfaces;
using WalletAPI.Infrastructure.Data;

namespace WalletAPI.Infrastructure.Repositories;

public class Repository<T>: IRepository<T> where T:class
{
    
    /*   TODO:
            [ ] How many will be needed?    
            [ ] Add DbContext (Transactions or User)
     
     */

    private readonly WalletDbContext _context;
    
    private readonly DbSet<T> _dbSet;
    
    public Repository(WalletDbContext context)
    {
        _context = context;
        
        // Tell the context which table to look at
        _dbSet = context.Set<T>();
    }

    public async Task AddAsync(T entity, CancellationToken ct = default(CancellationToken))
    {
        await _dbSet.AddAsync(entity, ct);
    }
    
    public async Task<List<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }
    
    public async Task<T?> GetByIdAsync(int id, CancellationToken ct = default(CancellationToken))
    {
        return await _dbSet.FindAsync([id], ct);
    }
    
    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
    
    public async Task<T> DeleteAsync(T entity, CancellationToken ct = default)
    {
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync(ct);
        return entity;
    }
}