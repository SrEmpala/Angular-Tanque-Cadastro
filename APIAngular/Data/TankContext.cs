using APIAngular.Data.Map;
using APIAngular.Model;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace APIAngular.Data
{
    public class TankContext : DbContext
    {
       public TankContext(DbContextOptions<TankContext> options) : base(options) { }

       public DbSet<TankModel> Tank { get; set; }

        protected override void OnModelCreating(ModelBuilder tankBuilder)
        {
            tankBuilder.ApplyConfiguration(new TankMap());
            base.OnModelCreating(tankBuilder);
        }
    }
}
