using InternetPlatformOfArtist.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionsController : ControllerBase
    {
        private readonly IRepository.ICompetitionRepository repository;
        public CompetitionsController(IRepository.ICompetitionRepository _repository)
        {
            repository = _repository;
        }
        // GET: api/competitions
        [HttpGet]
        public async Task<object> GetAllCompetition()
        {
            return await repository.GetAllCompetition();
        }

        // GET api/competitions/5
        [HttpGet("{id}")]
        public async Task<object> GetCompetitionById(int id)
        {
            var competition = await repository.GetCompetitionById(id);

            if (competition == null)
            {
                return NotFound();
            }
            return Ok(competition);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Models.Competition>> AddCompetition(Models.Competition competition)
        {
            await repository.AddCompetition(competition);

            return CreatedAtAction("GetCompetitionById", new { id = competition.IdCompetition }, competition);
        }

        // PUT api/competitions/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.Competition>> ChangeCompetition(int id, Models.Competition competition)
        {
            string message;
            if (id != competition.IdCompetition)
            {
                return BadRequest();
            }

            try 
            {
                await repository.ChangeCompetition(id, competition);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.CompetitionExists(id))
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

        //GET api/competitions/Владимир
        [HttpGet("city/{city}")]
        public async Task<ActionResult> GetCompetitionByCity(string city)
        {
            var competition = await repository.GetCompetitionByCity(city);

            return Ok(competition);
        }

        //GET api/competitions/mycompetitions/5
        [Authorize]
        [HttpGet("mycompetitions/{idUser:int}")]
        public async Task<object> GetCompetitionsByUserAsync(int idUser)
        {
            return await repository.GetCompetitionsByUserAsync(idUser);
        }

        [Authorize]
        [HttpPut("cancel/{idCompetition}")]
        public async Task<object> CancelCompetition(int idCompetition)
        {
            Models.Competition competition;
            try
            {
                competition = await repository.CancelCompetition(idCompetition);
                if (competition == null)
                {
                    return BadRequest();
                }
            }
            catch(DbUpdateConcurrencyException)
            {
                return BadRequest();
            }
            
            return await GetCompetitionsByUserAsync(competition.IdUser);
        }
    }
}
