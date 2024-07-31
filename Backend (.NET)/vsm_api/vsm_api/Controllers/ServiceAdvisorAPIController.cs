using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceAdvisorAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public ServiceAdvisorAPIController(VsmContext context)
        {
            this.context = context;
        }
        // GET: api/ServiceAdvisorAPI
        [HttpGet]
        public ActionResult<List<ServiceAdvisor>> GetAllServiceAdvisors()
        {
            var data = context.ServiceAdvisors.ToList();
            return Ok(data);
        }

        // GET: api/ServiceAdvisorAPI/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceAdvisor>> GetServiceAdvisorById(string id)
        {
            var serviceAdvisor = await context.ServiceAdvisors.FindAsync(id);
            if (serviceAdvisor == null)
            {
                return NotFound();
            }
            return Ok(serviceAdvisor);
        }

        // POST: api/ServiceAdvisorAPI
        [HttpPost]
        public async Task<ActionResult<ServiceAdvisor>> PostServiceAdvisor(ServiceAdvisor serviceAdvisor)
        {
            await context.ServiceAdvisors.AddAsync(serviceAdvisor);
            await context.SaveChangesAsync();
            return Ok(serviceAdvisor);
        }

        // PUT: api/ServiceAdvisorAPI
        [HttpPut]
        public async Task<ActionResult<ServiceAdvisor>> PutServiceAdvisor(ServiceAdvisor serviceAdvisor)
        {
            context.Entry(serviceAdvisor).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(serviceAdvisor);
        }

        // DELETE: api/ServiceAdvisorAPI/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteServiceAdvisor(string id)
        {
            var serviceAdvisor = await context.ServiceAdvisors.FindAsync(id);
            if (serviceAdvisor == null)
            {
                return NotFound();
            }

            context.ServiceAdvisors.Remove(serviceAdvisor);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
