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
    public class StatementesController : ControllerBase
    {
        private Context.ArtContext context;
        public StatementesController(Context.ArtContext _context)
        {
            context = _context;
        }

        // GET: api/statementes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> Get()
        {
            return await context.Statement.ToListAsync();
        }

        // GET api/statementes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Statement>> GetStatementById(int id)
        {
            var statement = await context.Statement.FindAsync(id);
            if (statement == null)
            {
                return NotFound();
            }
            return statement;
        }

        // POST api/statementes
        [HttpPost]
        public async Task<ActionResult<Models.Statement>> AddStatement(Models.Statement statement)
        {
            context.Statement.Add(statement);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetStatementById", new { id = statement.IdStatement }, statement);
        }

        // PUT api/<StatementesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/statements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> DeleteStatement(int id)
        {
            var statement = await context.Statement.FindAsync(id);
            if (statement == null)
            {
                return NotFound();
            }
            context.Statement.Remove(statement);
            await context.SaveChangesAsync();
            return await context.Statement.ToListAsync();
        }
    }
}
