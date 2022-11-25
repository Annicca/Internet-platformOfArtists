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

        private int groupType = 1;
        private int competitionType = 2;
        private int statusAccept = 1;

        public StatementesController(Context.ArtContext _context)
        {
            context = _context;
        }

        // GET: api/statementes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> Get()
        {
            return await context.Statement.Include("User").ToListAsync();
        }

        // GET api/statementes/5
        [HttpGet("{id}")]
        public IActionResult GetStatementById(int id)
        {
            var statement = context.Statement.Find(id);
            if (statement == null)
            {
                return NotFound();
            }
            return Ok(statement);
        }

        // POST api/statementes
        [HttpPost]
        public async Task<ActionResult<Models.Statement>> AddStatement(Models.Statement statement)
        {
            context.Statement.Add(statement);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetStatementById", new { id = statement.IdStatement }, statement);
        }

        private bool StatementExists(int id)
        {
            return context.Statement.Any(s => s.IdStatement == id);
        }

        //обработка заяявок

        // PUT api/statementes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.Statement>> ChangeStatement(int id, Models.Statement statement)
        {
            string message;
            if (id != statement.IdStatement)
            {
                return BadRequest();
            }

            context.Entry(statement).State = EntityState.Modified;

            try
            {
                //await context.SaveChangesAsync();
                if(statement.IdStatusStatement == statusAccept && statement.IdType == groupType)
                {
                    var group = new Models.Group();
                    group.IdUser = statement.IdUser;
                    group.NameGroup = statement.Name;
                    group.DescriptionGroup = statement.Description;
                    group.CityGroup = statement.City;
                    group.AddressGroup = statement.Address;
                    GroupsController groupsController = new GroupsController(context);
                    await groupsController.AddGroup(group);
                }
                if (statement.IdStatusStatement == statusAccept && statement.IdType == competitionType)
                {
                    var competition = new Models.Competition();
                    competition.IdUser = statement.IdUser;
                    competition.NameCompetition = statement.Name;
                    competition.DescriptionCompetition = statement.Description;
                    competition.CityCompetition = statement.City;
                    competition.CityCompetition = statement.Address;
                    CompetitionsController groupsController = new CompetitionsController(context);
                    await groupsController.AddCompetition(competition);
                }
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatementExists(id))
                {
                    message = "Заявка не существует";
                    return NotFound(message);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStatementById", new { id = statement.IdStatement }, statement);
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
