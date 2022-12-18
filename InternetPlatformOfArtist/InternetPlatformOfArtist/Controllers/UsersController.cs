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

        //[HttpGet("user")]
        //public async Task<ActionResult> UserByJwt(HttpContext httpContext)
        //{
        //    try
        //    {
        //        var jwt = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        //        //var jwt = Request.Cookies["jwt"];

        //        var token = jwtService.Verify(jwt);

        //        int userId = int.Parse(token.Issuer);
        //        var user = await context.User.Include("UserRole").FirstOrDefaultAsync(u => u.IdUser == userId);
        //        //var nameIdentifier = this.HttpContext.User.Pay.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

        //        HttpContext.Response.ContentType = "application/json";
        //        await HttpContext.Response.WriteAsync(JsonSerializer.Serialize(user));
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

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
