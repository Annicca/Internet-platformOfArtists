using InternetPlatformOfArtist.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using InternetPlatformOfArtist.Models;
using InternetPlatformOfArtist.IRepository;

namespace InternetPlatformOfArtist.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository repository;
        public UsersController(IUserRepository _repository)
        {
            repository = _repository;
        }
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>>  GetUsers()
        {
            return await repository.GetUsers();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var user = await repository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/users/login
        [HttpGet("userLogin/{login}")]
        public async Task<List<User>> GetUserByLogin(string login)
        {
            return await repository.GetUserByLogin(login);
        }

        // POST api/users/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {

            try
            {
                var userResult = await repository.Register(user);
                if(userResult == null)
                {
                    return BadRequest(new { message = "Пользователь с таким login уже существует" });
                }
            }
            catch
            {
                BadRequest(new { message = "Что-то пошло не так" });
            }

            LoginModel loginUser = new LoginModel(user.LoginUser, user.PasswordUser);
            return await Login(loginUser);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel log)
        {
            var user = GetUserByLogin(log.Login).Result.First();

            if (user == null)
            {
                return BadRequest(new { message = "Пользователя с таким login не существует" });
            }
            if(!BCrypt.Net.BCrypt.Verify(log.Password, user.PasswordUser))
            {
                return BadRequest(new { message = "Вы ввели неправльно логин или пароль" });
            }

            var logining = await repository.Login(user.IdUser);

            return Ok(logining);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<ActionResult> ChangeUser(int id, User user)
        {
            if (id != user.IdUser)
            {
                return BadRequest();
            }

            try
            {
                await repository.ChangeUser(id, user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.UserExists(id))
                {
                    return NotFound(new { message = "Пользователь не существует" });
                }
                else
                {
                    throw;
                }
            }

            return await GetUserById (user.IdUser);
        }
    
        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<User>>> DeleteUser(int id)
        {
            var user = await repository.DeleteUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return await GetUsers();
        }
    }
}
