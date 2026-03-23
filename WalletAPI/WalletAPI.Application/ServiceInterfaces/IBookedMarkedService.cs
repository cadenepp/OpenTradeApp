using WalletAPI.Application.DTOs;
using WalletAPI.Domain.Models;

namespace WalletAPI.Application.ServiceInterfaces;

public interface IBookedMarkedService
{
    Task<BookMarked> AddAsync(BookMarkedDto dto, User user, CancellationToken ct);
    Task<BookMarked> GetByIdAsync(long id, CancellationToken ct);
    Task<List<BookMarked>> GetAllAsync(CancellationToken ct);
    Task<bool> DeleteAsync(long id, CancellationToken ct);
}