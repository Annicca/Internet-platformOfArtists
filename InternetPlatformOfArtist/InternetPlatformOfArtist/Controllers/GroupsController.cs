﻿using Microsoft.AspNetCore.Mvc;
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
    public class GroupsController : ControllerBase
    {
        private Context.ArtContext context;
        public GroupsController(Context.ArtContext _context)
        {
            context = _context;
        }
        // GET: api/groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Group>>> GetGroups()
        {
            return await context.Group.ToListAsync();
        }

        // GET api/groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Group>> GetGroupById(int id)
        {
            var group = await context.Group.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }
            return group;
        }

        // POST api/groups
        [HttpPost]
        public async Task<ActionResult<Models.Group>> AddGroup(Models.Group group)
        {
            context.Group.Add(group);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetGroupById", new { id = group.IdGroup }, group);
        }

        public bool GroupExists(int id)
        {
            return context.Group.Any(e => e.IdGroup == id);
        }

        // PUT api/groups/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.Group>> ChangeGroup(int id, Models.Group group)
        {
            string message;
            if (id != group.IdGroup)
            {
                return BadRequest();
            }

            context.Entry(group).State = EntityState.Modified;

            try
            {

                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
                {
                    message = "Коллектив не существует";
                    return NotFound(message);
                }
                else
                {
                    throw;
                }
            }

            return await GetGroupById(group.IdGroup);
        }

        // DELETE api/groups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Models.Group>>> DeleteGroup(int id)
        {
            var group = await context.Group.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }
            context.Group.Remove(group);
            await context.SaveChangesAsync();
            return await context.Group.ToListAsync();
        }
        //поиск по городам
        //GET api/groups/Владимир
        [HttpGet("city")]
        public async Task<ActionResult<IEnumerable<Models.Group>>> GetGroupsByCity(string city)
        {
            return await context.Group.Where(c => c.CityGroup == city).ToListAsync();
        }

    }
}
