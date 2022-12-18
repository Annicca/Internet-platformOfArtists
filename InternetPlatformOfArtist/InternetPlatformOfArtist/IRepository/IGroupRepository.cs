using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.IRepository
{
    public interface IGroupRepository
    {
        Task<ActionResult<IEnumerable<Group>>> GetAllGroup();
        Task<Group> GetGroupById(int id);
        Task<Group> AddGroup(Group group);
        Task<ActionResult<Group>> ChangeGroup(int id, Group group);
        Task<Group> DeleteGroup(int id);
        Task<ActionResult<IEnumerable<Group>>> GetGroupsByCity(string city);
        Task<object> GetGroupsByUserAsync(int idUser);
        bool GroupExists(int id);
    }
}
