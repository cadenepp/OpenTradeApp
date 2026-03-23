using WalletAPI.Domain.Interfaces;
using WalletAPI.Domain.Models;
using WalletAPI.Infrastructure.Data;

namespace WalletAPI.Infrastructure.Repositories;

public class BookMarkRepository : Repository<BookMarked>, IBookMarkedRepository
{
    public BookMarkRepository(WalletDbContext db) : base(db){}
}