namespace WalletAPI.Domain.Interfaces;

public interface IRepository <T> where T:class
{
    Task AddAsync(T entity, CancellationToken cancellationToken = default);
    Task<List<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<T> DeleteAsync(T entity, CancellationToken cancellationToken = default);
    Task SaveChangesAsync();
}