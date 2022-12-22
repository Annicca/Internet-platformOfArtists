using InternetPlatformOfArtist.Context;
using InternetPlatformOfArtist.Helpers;
using InternetPlatformOfArtist.IRepository;
using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Repository
{
    public class RepositoryUser : IUserRepository
    {
        private readonly ArtContext context;
        private readonly JwtServiceAuthentication jwtServiceAuth;
        private readonly JwtServiceRegistration jwtServiceRegistr;
        public RepositoryUser(ArtContext _context, JwtServiceAuthentication _jwtServiceAuth, JwtServiceRegistration _jwtServiceRegistr)
        {
            context = _context;
            jwtServiceAuth = _jwtServiceAuth;
            jwtServiceRegistr = _jwtServiceRegistr;
        }

        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await context.User.Include("UserRole").ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await context.User.Include("UserRole").FirstOrDefaultAsync(u => u.IdUser == id);
            if (user == null)
            {
                return user;
            }
            return user;
        }

        public async Task<List<User>> GetUserByLogin(string login)
        {
            return await context.User.Where(u => u.LoginUser == login).ToListAsync();
        }

        public async Task<object> Login(int UserId)
        {

            var jwt = jwtServiceRegistr.Geterate(UserId);

            var token = jwtServiceAuth.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            var userLogining = await context.User.FindAsync(userId);

            return new
            {
                message = "success",
                token = jwt,
                user = userLogining
            };
        }

        public async Task<User> Register(User user)
        {
            if (GetUserByLogin(user.LoginUser).Result.Count != 0)
            {
                return null;
            }
            var registerUser = new Models.User(
                user.SurnameUser,
                user.NameUser,
                user.PatronimycUser,
                user.LoginUser,
                BCrypt.Net.BCrypt.HashPassword(user.PasswordUser),
                user.MailUser,
                user.PhoneUser,
                2);

            context.User.Add(registerUser);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<User> ChangeUser(int id, User user)
        {
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<User> DeleteUser(int id)
        {
            var user = await context.User.FindAsync(id);
            if (user == null)
            {
                return user;
            }
            context.User.Remove(user);
            await context.SaveChangesAsync();

            return user;
        }

        public bool UserExists(int id)
        {
            return context.User.Any(e => e.IdUser == id);
        }
    }
}
