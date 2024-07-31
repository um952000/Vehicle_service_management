using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public VehicleAPIController(VsmContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public ActionResult<List<Vehicle>> GetAllVehicles() { 
            var data =  context.Vehicles.ToList();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicleById(int id)
        {
            var v = await context.Vehicles.FindAsync(id);
            if(v == null)
            {
                return NotFound();
            }
            return Ok(v);
        }
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle) { 
            await context.Vehicles.AddAsync(vehicle);
            await context.SaveChangesAsync();
            return Ok(vehicle);
        }
        [HttpPut]
        public async Task<ActionResult<Vehicle>> PutVehicle(Vehicle vehicle)
        {
            context.Entry(vehicle).State=EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(vehicle);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicle(int id)
        {
            var data = await context.Vehicles.FindAsync(id);
            if(data == null)
            {
                return NotFound();
            }
             context.Vehicles.Remove(data);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
