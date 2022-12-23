using InternetPlatformOfArtist.IRepository;
using InternetPlatformOfArtist.Models;
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
    public class GroupsController : ControllerBase
    {
        private readonly IGroupRepository repository;
        public GroupsController(IGroupRepository _repository)
        {
            repository = _repository;
        }

        // GET: api/groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroup()
        {
            return await repository.GetAllGroup();
        }

        // GET api/groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetGroupById(int id)
        {
            var group = await repository.GetGroupById(id);
            if (group == null)
            {
                return NotFound();
            }
            return Ok(group);
        }

        // POST api/groups
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Group>> AddGroup(Group group)
        {
            await repository.AddGroup(group);

            return CreatedAtAction("GetGroupById", new { id = group.IdGroup }, group);
        }

        // PUT api/groups/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> ChangeGroup(int id, Group group)
        {
            string message;
            if (id != group.IdGroup)
            {
                return BadRequest();
            }

            try
            {
                await repository.ChangeGroup(id, group);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.GroupExists(id))
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
        [Authorize]
        public async Task<object> DeleteGroup(int id)
        {
            var group = await repository.DeleteGroup(id);
            if (group == null)
            {
                return NotFound();
            }
            return await GetGroupsByUserAsync(group.IdUser);
        }

        //поиск по городам
        //GET api/groups/Владимир
        [HttpGet("city/{city}")]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroupsByCity(string city)
        {
            return await repository.GetGroupsByCity(city);
        }

        //коллективы пользователя
        //GET api/mygroups/5
        [HttpGet("mygroups/{idUser:int}")]
        [Authorize]
        public async Task<object> GetGroupsByUserAsync(int idUser)
        {
            return await repository.GetGroupsByUserAsync(idUser);
        }

    }
}
