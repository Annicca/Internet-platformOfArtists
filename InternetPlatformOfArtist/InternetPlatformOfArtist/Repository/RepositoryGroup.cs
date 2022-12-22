using InternetPlatformOfArtist.Context;
using InternetPlatformOfArtist.IRepository;
using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryGroup : IGroupRepository
    {
        private readonly ArtContext context;
        public RepositoryGroup(ArtContext _context)
        {
            context = _context;
        }

        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroup()
        {
             return await context.Group.Include("Director").OrderByDescending(g => g.IdGroup).ToListAsync();
        }

        public async Task<Group> GetGroupById(int id)
        {
            var group = await context.Group.Include("Director").FirstOrDefaultAsync(g => g.IdGroup == id);
            return group;
        }

        public async Task<Group> AddGroup(Group group)
        {

            group.Img = group.RandomDefaultImageGroup();
            context.Group.Add(group);
            await context.SaveChangesAsync();

            return group;
        }

        public async Task<ActionResult<Group>> ChangeGroup(int id, Group group)
        {
            context.Entry(group).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return group;
        }

        public async Task<Group> DeleteGroup(int id)
        {
            var group = await context.Group.FindAsync(id);
            if (group == null)
            {
                return group;
            }

            context.Group.Remove(group);
            await context.SaveChangesAsync();

            return group;
        }

        public async Task<ActionResult<IEnumerable<Group>>> GetGroupsByCity(string city)
        {
            return await context.Group.Include("Director").Where(c => c.CityGroup == city).OrderByDescending(g => g.IdGroup).ToListAsync();
        }

        public async Task<object> GetGroupsByUserAsync(int idUser)
        {
            return await context
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
                g.Category,
                g.Img,
                Competitions = g
                    .Competitions
                    .Select(c => new { c.IdCompetition, c.NameCompetition, start = c.DateStart.ToShortDateString(), finish = c.DateFinish.ToShortDateString(), c.CityCompetition, c.Status, c.Img })
                    .ToList()
            }).OrderByDescending(g => g.IdGroup).ToListAsync();

        }

        public bool GroupExists(int id)
        {
            return context.Group.Any(e => e.IdGroup == id);
        }
    }
}
