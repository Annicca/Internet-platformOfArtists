using InternetPlatformOfArtist.Helpers;
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
        private JwtService jwtService;

        private int groupType = 1;
        private int competitionType = 2;
        private int statusAccept = 1;
        private int roleDirector = 3;
        private int roleOrganizer = 4;

        public StatementesController(Context.ArtContext _context, JwtService _jwtService)
        {
            context = _context;
            jwtService = _jwtService;
        }

        // GET: api/statementes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> Get()
        {
            return await context.Statement.Include("User").Include("Type").ToListAsync();
        }

        // GET api/statementes/5
        [HttpGet("{id}")]
        public IActionResult GetStatementById(int id)
        {
            var statement = context.Statement.Include("User").Include("Type").Include("Status").Where(s => s.IdStatement == id);
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
        public async Task<ActionResult<Models.Statement>> ChangeStatement(Models.Statement statement, int id)
        {

            int role = 0;
            string message;

            try
            {
                context.Entry(statement).State = EntityState.Modified;
                await context.SaveChangesAsync();

                if (statement.IdStatusStatement == statusAccept && statement.IdType == groupType)
                {
                    var group = new Models.Group();
                    group.IdUser = statement.IdUser;
                    group.NameGroup = statement.Name;
                    group.DescriptionGroup = statement.Description;
                    group.CityGroup = statement.City;
                    group.AddressGroup = statement.Address;
                    GroupsController groupsController = new GroupsController(context);
                    await groupsController.AddGroup(group);
                    role = roleDirector;
                }
                else if (statement.IdStatusStatement == statusAccept && statement.IdType == competitionType)
                {
                    var competition = new Models.Competition();
                    competition.IdUser = statement.IdUser;
                    competition.NameCompetition = statement.Name;
                    competition.DescriptionCompetition = statement.Description;
                    competition.CityCompetition = statement.City;
                    competition.CityCompetition = statement.Address;
                    CompetitionsController groupsController = new CompetitionsController(context);
                    await groupsController.AddCompetition(competition);
                    role = roleOrganizer;
                }

                if(role != 0)
                {
                    UsersController userController = new UsersController(context, jwtService);
                    await userController .ChangeUserRole(statement.IdUser, role);
                }
                
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
