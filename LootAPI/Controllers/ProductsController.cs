using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using LootAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LootAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAnyOrigin")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsContext _context;

        public ProductsController(ProductsContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product != null)
            {
                return Ok(product);
            }
            return NotFound();
        }
        
        [HttpGet]
        public async Task<IEnumerable<Product>> List()
        {
            List<Product> product = await _context.Product.ToListAsync();
            return product;
        }
        
        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product product)
        {
            _context.Add(product);
            await _context.SaveChangesAsync();
            //return CreatedAtAction()
            return Created("products/" + product.Id, product);
        }
    }
}