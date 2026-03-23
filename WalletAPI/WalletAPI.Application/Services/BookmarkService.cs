using WalletAPI.Application.DTOs;
using WalletAPI.Application.ServiceInterfaces;
using WalletAPI.Domain.Interfaces;
using WalletAPI.Domain.Models;
using WalletAPI.Infrastructure.Repositories;

namespace WalletAPI.Application.Services;

public class BookmarkService : IBookedMarkedService
{
    
    private readonly IBookMarkedRepository _bookMarkedRepository;
    public BookmarkService(IBookMarkedRepository bookMarkedRepository)
    {
        _bookMarkedRepository = bookMarkedRepository;
    }

    public Task<BookMarked> AddAsync(BookMarkedDto dto,User user, CancellationToken ct)
    {
        var entity = new BookMarked
        {
            DateMarked = DateTime.Now,
            AccountBalance = new AccountBalance
            {
                TokenAddress = dto.AccountBalance.Token_Address,
                Name = dto.AccountBalance.Name,
                Symbol = dto.AccountBalance.Symbol,
                PossibleSpam = dto.AccountBalance.Possible_Spam,
                VerifiedContract = dto.AccountBalance.Verified_Contract,
                UserId = user.UserId,
                User = user
            },
            TransactionHistory = new TransactionHistory
            {
                Hash = dto.TransactionHistory.hash,
                BlockNumber = long.Parse(dto.TransactionHistory.block_number),
                Timestamp = dto.TransactionHistory.block_timestamp,
                From = dto.TransactionHistory.from_address,
                To = dto.TransactionHistory.to_address,
                Value = decimal.Parse(dto.TransactionHistory.value),
                Success = true,
                ChainId = 0,
                UserId = user.UserId,
                User = user

            }
        };
        
        _bookMarkedRepository.AddAsync(entity, ct);
        return Task.FromResult(entity);
    }

    public Task<BookMarked> GetByIdAsync(long id, CancellationToken ct) => _bookMarkedRepository.GetByIdAsync((int) id, ct);
    

    public Task<List<BookMarked>> GetAllAsync(CancellationToken ct) => _bookMarkedRepository.GetAllAsync();

    public async Task<bool> DeleteAsync(long id, CancellationToken ct)
    {
        
        var bookmarkedEntity = _bookMarkedRepository.GetByIdAsync((int) id, ct);
        if (bookmarkedEntity == null) return false;
        
        await _bookMarkedRepository.DeleteAsync(bookmarkedEntity.Result, ct);
        return true;
        
    }
}