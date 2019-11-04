using Microsoft.EntityFrameworkCore;

namespace LootAPI.Models
{
    public class ProductsContext : DbContext
    {
        public ProductsContext(DbContextOptions<ProductsContext> options):base(options){}
        public DbSet<LootAPI.Models.Product> Product { get; set; }
    }
}