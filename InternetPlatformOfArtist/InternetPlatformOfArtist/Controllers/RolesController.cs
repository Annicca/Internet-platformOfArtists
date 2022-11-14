using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternetPlatformOfArtist.Context;
using InternetPlatformOfArtist.Models;

namespace InternetPlatformOfArtist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ArtContext context;

        public RolesController(ArtContext _context)
        {
            context = _context;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRole()
        {
            return await context.Role.ToListAsync();
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRoleById(int id)
        {
            var role = await context.Role.FindAsync(id);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        public Role FindRoleById(int id)
        {
            return context.Role.Find(id);
        }

        // PUT: api/Roles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(int id, Role role)
        {
            if (id != role.IdRole)
            {
                return BadRequest();
            }

            context.Entry(role).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/Roles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            context.Role.Add(role);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetRole", new { id = role.IdRole }, role);
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await context.Role.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            context.Role.Remove(role);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleExists(int id)
        {
            return context.Role.Any(e => e.IdRole == id);
        }
    }
}
