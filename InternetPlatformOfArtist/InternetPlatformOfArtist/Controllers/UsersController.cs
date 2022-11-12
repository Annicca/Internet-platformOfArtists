using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InternetPlatformOfArtist.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private Context.ArtContext context;
        public UsersController(Context.ArtContext _context)
        {
            context = _context;
        }
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.User>>>  GetUsers()
        {
            return await context.User.ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.User>> GetUserById(int id)
        {
            var user = await context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST api/users
        [HttpPost]
        public async Task<ActionResult<Models.User>> AddUser(Models.User user)
        {
            context.User.Add(user);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetUserById", new { id = user.idUser }, user);
        }

        private bool UserExists(int id)
        {
            return context.User.Any(e => e.idUser == id);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeUser(int id, Models.User user)
        {
            if (id != user.idUser)
            {
                return BadRequest();
            }

            context.Entry(user).State = EntityState.Modified;

            try
            { 
            
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Models.User>>> DeleteUser(int id)
        {
            var user = await context.User.FindAsync(id);
               if (user == null)
               {
                        return NotFound();
               }     
            context.User.Remove(user);
            await context.SaveChangesAsync();
            return await context.User.ToListAsync();
        }
    }
}
