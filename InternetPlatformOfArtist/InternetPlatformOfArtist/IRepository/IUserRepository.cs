using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.IRepository
{
    public interface IUserRepository
    {
        Task<ActionResult<IEnumerable<User>>> GetUsers();
        Task<User> GetUserById(int id);
        Task<List<User>> GetUserByLogin(string login);
        Task<object> Login(int idUser);
        Task<User> Register(User user);
        Task<User> ChangeUser(int id, User user);
        Task<User> DeleteUser(int id);
        bool UserExists(int id);
    }
}
