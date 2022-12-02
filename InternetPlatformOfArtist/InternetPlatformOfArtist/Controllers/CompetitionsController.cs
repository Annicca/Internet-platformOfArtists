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
        public async Task<object> GetAllCompetition()
        {
            //return await context.Competition.Include("Status").AsNoTracking().ToListAsync();
            return await context
            .Competition
            .Select(c => new
            {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Status,
                c.Img
            }).ToListAsync();
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
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Img,
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
        public async Task<object> GetCompetitionById(int id)
        {
            var competition = await context.Competition.Select(c => new {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Img,
                c.Status.NameStatus
            }).FirstOrDefaultAsync(com => com.IdCompetition == id);

            if (competition == null)
            {
                return NotFound();
            }
            return Ok(competition);
        }

        //public Models.Competition FindCompetitionById(int id)
        //{
        //   return context.Competition.Find(id);
        //}

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

        //GET api/competitions/Владимир
        [HttpGet("city/{city}")]
        public async Task<object> GetCompetitionByCity(string city)
        {
            var competition = await context.Competition.Where(c => c.CityCompetition == city).Select(c => new {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Img,
                c.Status.NameStatus
            }).ToListAsync();

            if(competition == null)
            {
                return BadRequest(new { message = "Мы не нашли то, что вы искали" });
            }
            return Ok(competition);
        }
    }
}
