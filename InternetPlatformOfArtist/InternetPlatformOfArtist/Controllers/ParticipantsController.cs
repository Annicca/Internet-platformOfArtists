using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternetPlatformOfArtist.Context;
using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Authorization;

namespace InternetPlatformOfArtist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly ArtContext _context;

        public ParticipantsController(ArtContext context)
        {
            _context = context;
        }

        // GET: api/Participants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipant()
        {
            return await _context.Participant.ToListAsync();
        }

        // GET: api/Participants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id)
        {
            var participant = await _context.Participant.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        // POST: api/Participants
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Participant>> AddParticipant(Participant participant)
        {
            _context.Participant.Add(participant);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ParticipantExists(participant.IdCompetition, participant.IdGroup))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetParticipant", new { id = participant.IdCompetition }, participant);
        }

        private bool ParticipantExists(int idCompetition, int idGroup)
        {
            return _context.Participant.Any(e => e.IdCompetition == idCompetition && e.IdGroup == idGroup);
        }
    }
}
