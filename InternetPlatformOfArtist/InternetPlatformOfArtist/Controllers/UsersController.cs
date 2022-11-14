using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

            return CreatedAtAction("GetUserById", new { id = user.IdUser }, user);
        }

        private bool UserExists(int id)
        {
            return context.User.Any(e => e.IdUser == id);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.User>> ChangeUser(int id, Models.User user)
        {
            string message;
            if (id != user.IdUser)
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
                    message = "Пользователь не существует";
                    return NotFound(message);
                }
                else
                {
                    throw;
                }
            }

            return await GetUserById(user.IdUser);
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

        //коллективы пользователя
        //GET api/users/groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Group>>> GetGroupsByUserAsync(int id)
        {
            List<Models.Group> groups = await context.Group.ToListAsync();
            return groups.Where(group => group.IdUser == id).ToList();

        }

        //конкурсы пользователя
        //GET api/users/competitions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Competition>>> GetCompetitionsByUserAsync(int id)
        {
            List<Models.Competition> competitions = await context.Competition.ToListAsync();
            return competitions.Where(c => c.IdUser == id).ToList();

        }

        //заявки пользователя
        //GET api/users/groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> GetStatementByUserAsync(int id)
        {
            List<Models.Statement> statement = await context.Statement.ToListAsync();
            return statement.Where(statement => statement.IdUser == id).ToList();

        }


    }
}
