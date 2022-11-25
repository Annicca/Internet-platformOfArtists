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
    public class CompetitionsController : ControllerBase
    {
        private Context.ArtContext context;
        public CompetitionsController(Context.ArtContext _context)
        {
            context = _context;
        }

        // GET: api/competitions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Competition>>> GetAllCompetition()
        {
            return await context.Competition.AsNoTracking().ToListAsync();
        }
        // GET: api/competitions/participant
        [HttpGet("participant")]
        public async Task<object> GetCompetitionsWithGroups()
        {
            return new
            {
                Results = await context
            .Competition
            .Select(c => new
            {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                c.DateStart,
                c.DateFinish,
                c.CityCompetition,
                c.Status.NameStatus,
                Groups = c
                    .Groups
                    .Select(g => new { g.IdGroup, g.NameGroup, g.CityGroup, g.AddressGroup })
                    .ToList()
            }).ToListAsync()
            };
        }

        // GET api/competitions/5
        [HttpGet("{id}")]
        public IActionResult GetCompetitionById(int id)
        {
            var competition = context.Competition.Where(c => c.IdCompetition == id).Include("Organizer");
            if (competition == null)
            {
                return NotFound();
            }
            return Ok(competition);
        }

        public Models.Competition FindCompetitionById(int id)
        {
           return context.Competition.Find(id);
        }

        // POST api/competitions
        [HttpPost]
        public async Task<ActionResult<Models.Competition>> AddCompetition(Models.Competition competition)
        {
            context.Competition.Add(competition);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetCompetitionById", new { id = competition.IdCompetition }, competition);
        }

        private bool CompetitionExists(int id)
        {
            return context.Competition.Any(e => e.IdCompetition == id);
        }

        // PUT api/competitions/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.Competition>> ChangeCompetition(int id, Models.Competition competition)
        {
            string message;
            if (id != competition.IdCompetition)
            {
                return BadRequest();
            }

            context.Entry(competition).State = EntityState.Modified;

            try
            {

                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitionExists(id))
                {
                    message = "Конкурс не существует";
                    return NotFound(message);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCompetitionById", new { id = competition.IdCompetition }, competition);
        }

        // DELETE api/competitions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Competition>>> DeleteCompetition(int id)
        {
            var competition = await context.Competition.FindAsync(id);
            if (competition == null)
            {
                return NotFound();
            }
            context.Competition.Remove(competition);
            await context.SaveChangesAsync();
            return await context.Competition.ToListAsync();
        }

        ////принять участие

        ////PUT api/competitions/participant/5
        //[HttpPut("participant/{idCompetition}")]
        //public async Task<ActionResult<Models.Competition>> AddParticipant(int idGroup, int idCompetition)
        //{
        //    GroupsController controllerGroup = new GroupsController(context);
        //    ParticipantsController controllerParticipant = new ParticipantsController(context);
        //    Models.Participant participant = new Models.Participant(idCompetition, idGroup);
        //    try
        //    {
        //        await controllerParticipant.AddParticipant(participant);
        //        await context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CompetitionExists(idCompetition))
        //        {
        //            return NotFound("Конкурс не найден");
        //        }
        //        else if(!controllerGroup.GroupExists(idGroup))
        //        {
        //            return NotFound("Коллектив не найден");
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //GET api/competitions/Владимир
        [HttpGet("city")]
        public async Task<ActionResult<IEnumerable<Models.Competition>>> GetCompetitionByCity(string city)
        {
            return await context.Competition.Where(c => c.CityCompetition == city).ToListAsync();
        }
    }
}
