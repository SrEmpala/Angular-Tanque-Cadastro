using APIAngular.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace APIAngular.Data.Map
{
    public class TankMap : IEntityTypeConfiguration<TankModel>
    {
        public void Configure(EntityTypeBuilder<TankModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Nacao).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Modelo).IsRequired().HasMaxLength(30);
        }
    }
}
