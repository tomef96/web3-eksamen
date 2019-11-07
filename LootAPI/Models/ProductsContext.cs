using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace LootAPI.Models
{
    public class ProductsContext : DbContext
    {
        public ProductsContext(DbContextOptions options):base(options){}
        public DbSet<LootAPI.Models.Product> Product { get; set; }
        
    }
}