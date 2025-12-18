using Cars.Domain;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft. EntityFrameworkCore;

namespace Cars.Infrastructure
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Car> Cars { get; set; }
    }
}
