using InternetPlatformOfArtist.Helpers;
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
    [Authorize]
    public class StatementesController : ControllerBase
    {
        private readonly IStatementRepository repository;

        public StatementesController(IStatementRepository _repository)
        {
            repository = _repository;
        }

        // GET: api/statementes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statement>>> Get()
        {
            return await repository.Get();
        }

        // GET api/statementes/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetStatementById(int id)
        {
            var statement = await repository.GetStatementById(id);
            if (statement == null)
            {
                return NotFound();
            }
            return Ok(statement);
        }

        [HttpGet("search/{id}")]
        public async Task<ActionResult> GetStatementForSearch(int id)
        {
            var statement = await repository.GetStatementForSearch(id);
            return Ok(statement);
        }

        // POST api/statementes
        [HttpPost]
        public async Task<ActionResult<Statement>> AddStatement(Statement statement)
        {
            var statementResult = await repository.AddStatement(statement);

            if(statementResult == null)
            {
                return BadRequest(new { message = "У вас нет соответствующих прав" });
            }

            return CreatedAtAction("GetStatementById", new { id = statement.IdStatement }, statement);
        }

        //обработка заявок

        // PUT api/statementes/5
        [HttpPut("{id}/{idStatusStatement}")]
        public async Task<ActionResult<IEnumerable<Statement>>> ChangeStatement(int id, int idStatusStatement)
        {
            try
            {
                var statement = await repository.ChangeStatement(id, idStatusStatement);
                if(statement == null)
                {
                    return BadRequest(new { message = "Мы не смогли изменить пользователя" });
                }

            }
            catch (DbUpdateConcurrencyException)

            {
                if (!repository.StatementExists(id))
                {
                    return NotFound(new { message = "Заявка не существует" });
                }
                else
                {
                    throw;
                }
            }

            return await Get();
        }

        //заявки пользователя
        //GET api/mystatement/5
        [HttpGet("mystatement/{idUser:int}")]
        public async Task<object> GetStatementByUserAsync(int idUser)
        {
            return await repository.GetStatementByUserAsync(idUser);
        }

        // DELETE api/statements/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<IEnumerable<Models.Statement>>> DeleteStatement(int id)
        //{
        //    var statement = await context.Statement.FindAsync(id);
        //    if (statement == null)
        //    {
        //        return NotFound();
        //    }
        //    context.Statement.Remove(statement);
        //    await context.SaveChangesAsync();
        //    return await context.Statement.ToListAsync();
        //}

    }
}
