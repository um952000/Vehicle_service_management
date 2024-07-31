using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

namespace vsm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAPIController : ControllerBase
    {
        private readonly VsmContext context;

        public LoginAPIController(VsmContext context)
        {
            this.context = context;
        }

        // GET: api/LoginAPI
        [HttpGet]
        public ActionResult<List<Login>> GetAllLogins()
        {
            var data = context.Logins.ToList();
            return Ok(data);
        }

        // GET: api/LoginAPI/5
     /*   [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLoginById(int id)
        {
            var login = await context.Logins.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }
            return Ok(login);
        }
     */
        // POST: api/LoginAPI
        [HttpPost]
        public async Task<ActionResult<Login>> PostLogin(Login login)
        {
            await context.Logins.AddAsync(login);
            await context.SaveChangesAsync();
            return Ok(login);
        }

        // PUT: api/LoginAPI
        [HttpPut]
        public async Task<ActionResult<Login>> PutLogin(Login login)
        {
            context.Entry(login).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(login);
        }

        // DELETE: api/LoginAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLogin(string id)
        {
            var login = await context.Logins.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }

            context.Logins.Remove(login);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
