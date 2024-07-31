using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkItemAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public WorkItemAPIController(VsmContext context)
        {
            this.context = context;
        }

        // GET: api/WorkItemAPI
        [HttpGet]
        public ActionResult<List<WorkItem>> GetAllWorkItems()
        {
            var data = context.WorkItems.ToList();
            return Ok(data);
        }

        // GET: api/WorkItemAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkItem>> GetWorkItemById(int id)
        {
            var workItem = await context.WorkItems.FindAsync(id);
            if (workItem == null)
            {
                return NotFound();
            }
            return Ok(workItem);
        }
        // GET: api/WorkItemAPI/GetByServiceRecordId/5
        [HttpGet("GetByServiceRecordId/{id}")]
        public ActionResult<List<WorkItem>> GetWorkItemsByServiceRecordId(int id)
        {
            var workItems = context.WorkItems.Where(w => w.ServiceRecordID == id).ToList();
            return Ok(workItems);
        }

        // POST: api/WorkItemAPI
        [HttpPost]
        public async Task<ActionResult<WorkItem>> PostWorkItem(WorkItem workItem)
        {
            await context.WorkItems.AddAsync(workItem);
            await context.SaveChangesAsync();
            return Ok(workItem);
        }

        // PUT: api/WorkItemAPI
        [HttpPut]
        public async Task<ActionResult<WorkItem>> PutWorkItem(WorkItem workItem)
        {
            context.Entry(workItem).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(workItem);
        }

        // DELETE: api/WorkItemAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWorkItem(int id)
        {
            var workItem = await context.WorkItems.FindAsync(id);
            if (workItem == null)
            {
                return NotFound();
            }

            context.WorkItems.Remove(workItem);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
