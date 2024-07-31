using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceRecordAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public ServiceRecordAPIController(VsmContext context)
        {
            this.context = context;
        }

        // GET: api/ServiceRecordAPI
        [HttpGet]
        public ActionResult<List<ServiceRecord>> GetAllServiceRecords()
        {
            var data = context.ServiceRecords.ToList();
            return Ok(data);
        }

        // GET: api/ServiceRecordAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceRecord>> GetServiceRecordById(int id)
        {
            var serviceRecord = await context.ServiceRecords.FindAsync(id);
            if (serviceRecord == null)
            {
                return NotFound();
            }
            return Ok(serviceRecord);
        }

        // POST: api/ServiceRecordAPI
        [HttpPost]
        public async Task<ActionResult<ServiceRecord>> PostServiceRecord(ServiceRecord serviceRecord)
        {
            await context.ServiceRecords.AddAsync(serviceRecord);
            await context.SaveChangesAsync();
            return Ok(serviceRecord);
        }

        // PUT: api/ServiceRecordAPI
        [HttpPut]
        public async Task<ActionResult<ServiceRecord>> PutServiceRecord(ServiceRecord serviceRecord)
        {
            context.Entry(serviceRecord).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(serviceRecord);
        }

        // DELETE: api/ServiceRecordAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteServiceRecord(int id)
        {
            var serviceRecord = await context.ServiceRecords.FindAsync(id);
            if (serviceRecord == null)
            {
                return NotFound();
            }

            context.ServiceRecords.Remove(serviceRecord);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }

}
