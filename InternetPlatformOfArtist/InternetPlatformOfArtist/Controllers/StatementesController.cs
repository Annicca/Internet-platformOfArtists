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
        public async Task<ActionResult> GetStatementById(int id)
        {
            var statement = await context.Statement.Include("User").Include("Type").Include("Status").FirstAsync(s => s.IdStatement == id);
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
        [HttpPut("{id}/{idStatusStatement}")]
        public async Task<ActionResult<Models.Statement>> ChangeStatement(int id, int idStatusStatement)
        {

            int role = 0;
            string message;
            var statement = await context.Statement.FindAsync(id);
            statement.IdStatusStatement = idStatusStatement;

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
                    competition.DateStart = (DateTime)statement.DateStart;
                    competition.DateFinish = (DateTime)statement.DateStart;
                    competition.IdStatusCompetition = 1;
                    CompetitionsController groupsController = new CompetitionsController(context);
                    await groupsController.AddCompetition(competition);
                    role = roleOrganizer;
                }

                if (role != 0)
                {
                    UsersController userController = new UsersController(context, jwtService);
                    await userController.ChangeUserRole(statement.IdUser, role);
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

        //заявки пользователя
        //GET api/mystatement/5
        [HttpGet("mystatement/{idUser:int}")]
        public async Task<object> GetStatementByUserAsync(int idUser)
        {
            return
                new
                {
                    Results = await context.Statement.Select(s =>
                    new
                    {
                        s.IdStatement,
                        s.Name,
                        s.IdUser,
                        s.City,
                        s.Address,
                        s.Description,
                        start = s.DateStart,
                        finish = s.DateFinish,
                        type = s.Type.NameType,
                        status = s.Status.NameStatus
                    }
                    ).Where(s => s.IdUser == idUser).ToListAsync()
                };
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
