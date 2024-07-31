using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public CustomerAPIController(VsmContext context)
        {
            this.context = context;
        }

        // GET: api/CustomerAPI
        [HttpGet]
        public ActionResult<List<Customer>> GetAllCustomers()
        {
            var data = context.Customers.ToList();
            return Ok(data);
        }

        // GET: api/CustomerAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomerById(int id)
        {
            var customer = await context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // POST: api/CustomerAPI
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            await context.Customers.AddAsync(customer);
            await context.SaveChangesAsync();
            return Ok(customer);
        }
        [HttpPut]
        public async Task<ActionResult<Customer>> PutCustomer(Customer customer)
        {
           context.Entry(customer).State=EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(customer);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var customer = await context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            context.Customers.Remove(customer);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
