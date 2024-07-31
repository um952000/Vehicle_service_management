using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillOfMaterialAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public BillOfMaterialAPIController(VsmContext context)
        {
            this.context = context;
        }

        // GET: api/BillOfMaterialAPI
        [HttpGet]
        public ActionResult<List<BillOfMaterial>> GetAllBillOfMaterials()
        {
            var data = context.BillOfMaterials.ToList();
            return Ok(data);
        }

        // GET: api/BillOfMaterialAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BillOfMaterial>> GetBillOfMaterialById(int id)
        {
            var billOfMaterial = await context.BillOfMaterials.FindAsync(id);
            if (billOfMaterial == null)
            {
                return NotFound();
            }
            return Ok(billOfMaterial);
        }

        // GET: api/BillOfMaterialAPI/GetByServiceRecordId/5
        [HttpGet("GetByServiceRecordId/{id}")]
        public ActionResult<BillOfMaterial> GetBillOfMaterialsByServiceRecordId(int id)
        {
            var bills = context.BillOfMaterials.FirstOrDefault(b => b.ServiceRecordID == id);
            return Ok(bills);
        }

        // POST: api/BillOfMaterialAPI
        [HttpPost]
        public async Task<ActionResult<BillOfMaterial>> PostBillOfMaterial(BillOfMaterial billOfMaterial)
        {
            await context.BillOfMaterials.AddAsync(billOfMaterial);
            await context.SaveChangesAsync();
            return Ok(billOfMaterial);
        }

        // PUT: api/BillOfMaterialAPI
        [HttpPut]
        public async Task<ActionResult<BillOfMaterial>> PutBillOfMaterial(BillOfMaterial billOfMaterial)
        {
            context.Entry(billOfMaterial).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(billOfMaterial);
        }

        // DELETE: api/BillOfMaterialAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBillOfMaterial(int id)
        {
            var billOfMaterial = await context.BillOfMaterials.FindAsync(id);
            if (billOfMaterial == null)
            {
                return NotFound();
            }

            context.BillOfMaterials.Remove(billOfMaterial);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
