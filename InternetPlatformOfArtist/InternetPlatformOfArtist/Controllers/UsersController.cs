using InternetPlatformOfArtist.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

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

        // GET api/user/5
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = context.User.Include("UserRole").FirstOrDefault(u => u.IdUser == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/user/5
        [HttpGet("userLogin/{login}")]
        public Models.User GetUserByLogin(string login)
        {
            return context.User.FirstOrDefault(u => u.LoginUser == login);
        }
        // POST api/user/register
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

            return CreatedAtAction("GetUserById", new { id = user.IdUser }, registerUser);
        }

        [HttpPost("login")]
        public IActionResult Login(Models.LoginModel log)
        {
            var user = GetUserByLogin(log.Login);

            if (user == null)
            {

                return NotFound();
            }
            if(!BCrypt.Net.BCrypt.Verify(log.Password, user.PasswordUser))
            {
                return BadRequest(new { message = "Вы введи неправльно логин или пароль" });
            }

            var jwt = jwtService.Geterate(user.IdUser);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new 
            { 
                message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = context.User.Include("UserRole").FirstOrDefault(u => u.IdUser == userId);

                return Ok(user);
            }catch(Exception)
            {
                return Unauthorized();
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

        // PUT api/user/5
        [HttpPut("{id}")]
        public IActionResult ChangeUser(int id, Models.User user)
        {
            string message;
            if (id != user.IdUser)
            {
                return BadRequest();
            }

            context.Entry(user).State = EntityState.Modified;

            try
            { 
            
                context.SaveChangesAsync();
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

            return GetUserById(user.IdUser);
        }
    

        // DELETE api/user/5
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
        public async Task<ActionResult<IEnumerable<Models.Group>>> GetGroupsByUserAsync(int idUser)
        {
            List<Models.Group> groups = await context.Group.ToListAsync();
            return groups.Where(group => group.IdUser == idUser).ToList();

        }

        //конкурсы пользователя
        //GET api/mycompetitions/5
        [HttpGet("mycompetitions/{idUser:int}")]
        public async Task<ActionResult<IEnumerable<Models.Competition>>> GetCompetitionsByUserAsync(int idUser)
        {
            List<Models.Competition> competitions = await context.Competition.ToListAsync();
            return competitions.Where(c => c.IdUser == idUser).ToList();

        }

        //заявки пользователя
        //GET api/mystatement/5
        [HttpGet("mystatement/{idUser:int}")]
        public async Task<ActionResult<IEnumerable<Models.Statement>>> GetStatementByUserAsync(int idUser)
        {
            List<Models.Statement> statement = await context.Statement.ToListAsync();
            return statement.Where(statement => statement.IdUser == idUser).ToList();

        }


    }
}
