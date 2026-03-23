using WalletAPI.Domain.Models;

namespace WalletAPI.Domain.Interfaces;

public interface IUserRepository
{
    public async Task AddAsync(User user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<object> GetByIdAsync(int userid, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task SaveChangesAsync()
    {
        throw new NotImplementedException();
    }
    
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    

}