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
    public class StatusStatementsController : ControllerBase
    {
        private readonly ArtContext _context;

        public StatusStatementsController(ArtContext context)
        {
            _context = context;
        }

        // GET: api/StatusStatements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusStatement>>> GetStatusStatement()
        {
            return await _context.StatusStatement.ToListAsync();
        }

        // GET: api/StatusStatements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusStatement>> GetStatusStatement(int id)
        {
            var statusStatement = await _context.StatusStatement.FindAsync(id);

            if (statusStatement == null)
            {
                return NotFound();
            }

            return statusStatement;
        }

        // PUT: api/StatusStatements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusStatement(int id, StatusStatement statusStatement)
        {
            if (id != statusStatement.IdStatusStatement)
            {
                return BadRequest();
            }

            _context.Entry(statusStatement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusStatementExists(id))
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

        // POST: api/StatusStatements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StatusStatement>> PostStatusStatement(StatusStatement statusStatement)
        {
            _context.StatusStatement.Add(statusStatement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusStatement", new { id = statusStatement.IdStatusStatement }, statusStatement);
        }

        // DELETE: api/StatusStatements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusStatement(int id)
        {
            var statusStatement = await _context.StatusStatement.FindAsync(id);
            if (statusStatement == null)
            {
                return NotFound();
            }

            _context.StatusStatement.Remove(statusStatement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusStatementExists(int id)
        {
            return _context.StatusStatement.Any(e => e.IdStatusStatement == id);
        }
    }
}
