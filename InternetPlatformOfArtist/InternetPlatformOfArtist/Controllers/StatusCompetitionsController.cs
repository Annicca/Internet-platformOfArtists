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
    public class StatusCompetitionsController : ControllerBase
    {
        private readonly ArtContext _context;

        public StatusCompetitionsController(ArtContext context)
        {
            _context = context;
        }

        // GET: api/StatusCompetitions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusCompetition>>> GetStatusCompetition()
        {
            return await _context.StatusCompetition.ToListAsync();
        }

        // GET: api/StatusCompetitions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusCompetition>> GetStatusCompetition(int id)
        {
            var statusCompetition = await _context.StatusCompetition.FindAsync(id);

            if (statusCompetition == null)
            {
                return NotFound();
            }

            return statusCompetition;
        }

        // PUT: api/StatusCompetitions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusCompetition(int id, StatusCompetition statusCompetition)
        {
            if (id != statusCompetition.IdStatusCompetition)
            {
                return BadRequest();
            }

            _context.Entry(statusCompetition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusCompetitionExists(id))
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

        // POST: api/StatusCompetitions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StatusCompetition>> PostStatusCompetition(StatusCompetition statusCompetition)
        {
            _context.StatusCompetition.Add(statusCompetition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusCompetition", new { id = statusCompetition.IdStatusCompetition }, statusCompetition);
        }

        // DELETE: api/StatusCompetitions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusCompetition(int id)
        {
            var statusCompetition = await _context.StatusCompetition.FindAsync(id);
            if (statusCompetition == null)
            {
                return NotFound();
            }

            _context.StatusCompetition.Remove(statusCompetition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusCompetitionExists(int id)
        {
            return _context.StatusCompetition.Any(e => e.IdStatusCompetition == id);
        }
    }
}
