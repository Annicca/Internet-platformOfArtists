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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InternetPlatformOfArtist.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private Context.ArtContext context;
        private JwtService jwtService;
        public UsersController(Context.ArtContext _context, JwtService _jwtService)
        {
            context = _context;
            jwtService = _jwtService;

        }
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.User>>>  GetUsers()
        {
            return await context.User.Include("UserRole").ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var user = await context.User.Include("UserRole").FirstOrDefaultAsync(u => u.IdUser == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/users/login
        [HttpGet("userLogin/{login}")]
        public Models.User GetUserByLogin(string login)
        {
            return context.User.FirstOrDefault(u => u.LoginUser == login);
        }
        // POST api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<Models.User>> Register(Models.User user)
        {
            var registerUser = new Models.User(
                user.SurnameUser,
                user.NameUser,
                user.PatronimycUser,
                user.LoginUser,
                BCrypt.Net.BCrypt.HashPassword(user.PasswordUser),
                user.MailUser,
                2);

            context.User.Add(registerUser);
            await context.SaveChangesAsync();

            var userRegister = GetUserByLogin(user.LoginUser);

            Models.LoginModel loginUser = new Models.LoginModel();
            loginUser.Login = user.LoginUser;
            loginUser.Password = user.PasswordUser;

            return CreatedAtAction("Login",loginUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Models.LoginModel log)
        {
            var user = GetUserByLogin(log.Login);

            if (user == null)
            {
                return BadRequest(new { message = "Пользователя с таким login не существует" });
            }
            if(!BCrypt.Net.BCrypt.Verify(log.Password, user.PasswordUser))
            {
                return BadRequest(new { message = "Вы ввели неправльно логин или пароль" });
            }

            var jwt = jwtService.Geterate(user.IdUser);

            var token = jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            var userLogining =  await GetUserById(userId);

            return Ok(new 
            { 
                message = "success",
                token = jwt,
                user = user
            });
        }

        [HttpGet("user")]
        public async Task<ActionResult> UserByJwt(HttpContext httpContext)
        {
            try
            {
                var jwt = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                //var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                var user = await context.User.Include("UserRole").FirstOrDefaultAsync(u => u.IdUser == userId);
                //var nameIdentifier = this.HttpContext.User.Pay.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                HttpContext.Response.ContentType = "application/json";
                await HttpContext.Response.WriteAsync(JsonSerializer.Serialize(user));
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }



        private bool UserExists(int id)
        {
            return context.User.Any(e => e.IdUser == id);
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<ActionResult> ChangeUser(int id, Models.User user)
        {
            string message;
            if (id != user.IdUser)
            {
                return BadRequest();
            }

            context.Entry(user).State = EntityState.Modified;

            try
            { 
            
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    message = "Пользователь не существует";
                    return NotFound(message);
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
        public async Task<ActionResult<IEnumerable<Models.User>>> DeleteUser(int id)
        {
            var user = await context.User.FindAsync(id);
               if (user == null)
               {
                        return NotFound();
               }     
            context.User.Remove(user);
            await context.SaveChangesAsync();
            return await context.User.ToListAsync();
        }

        //коллективы пользователя
        //GET api/mygroups/5
        [HttpGet("mygroups/{idUser:int}")]
        public async Task<object> GetGroupsByUserAsync(int idUser)
        {
            return new
            {
                Results = await context
            .Group
            .Where(group => group.IdUser == idUser)
            .Select(g => new
            {
                g.IdGroup,
                g.Director,
                g.NameGroup,
                g.DescriptionGroup,
                g.CityGroup,
                g.AddressGroup,
                Competitions = g
                    .Competitions
                    .Select(c => new { c.IdCompetition, c.NameCompetition, start = c.DateStart.ToShortDateString(), finish = c.DateFinish.ToShortDateString(), c.CityCompetition, c.Status.NameStatus })
                    .ToList()
            }).ToListAsync()
            };

        }

        //конкурсы пользователя
        //GET api/mycompetitions/5
        [HttpGet("mycompetitions/{idUser:int}")]
        public async Task<object> GetCompetitionsByUserAsync(int idUser)
        {
            return new
            {
                Results = await context
                    .Competition
                    .Where(c => c.IdUser == idUser)
                    .Select(c => new
                    {
                        c.IdCompetition,
                        c.NameCompetition,
                        c.DescriptionCompetition,
                        c.DateStart,
                        c.DateFinish,
                        c.CityCompetition,
                        c.Status.NameStatus,
                        Groups = c
                            .Groups
                            .Select(g => new { g.IdGroup, mail = g.Director.MailUser, tele = g.Director.PhoneUser, g.NameGroup, g.CityGroup, g.AddressGroup })
                            .ToList()
                    }).ToListAsync()
                                };

        }

        //заявки пользователя
        //GET api/mystatement/5
        [HttpGet("mystatement/{idUser:int}")]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> GetStatementByUserAsync(int idUser)
        {
            List<Models.Statement> statement = await context.Statement.ToListAsync();
            return statement.Where(statement => statement.IdUser == idUser).ToList();

        }

        // PUT api/users/5
        [HttpPut("setrole/{id}")]
        public async Task<ActionResult> ChangeUserRole(int id, int idRole)
        {
            var user = context.User.Find(id);
            string message;
            if (id != user.IdUser)
            {
                return BadRequest();
            }

            try
            {
                if(user.IdRole != idRole)
                {
                    user.IdRole = idRole;
                    context.Entry(user).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                }
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    message = "Пользователь не существует";
                    return NotFound(message);
                }
                else
                {
                    throw;
                }
            }

            return await GetUserById(user.IdUser);
        }


    }
}
