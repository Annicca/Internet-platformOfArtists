using InternetPlatformOfArtist.Context;
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
    public class RepositoryCompetition : ICompetitionRepository
    {
        private readonly ArtContext context;
        public RepositoryCompetition(ArtContext _context)
        {
            context = _context;
        }

        public async Task<object> GetAllCompetition()
        {
            List<Competition> competitions = await context.Competition.Where(c => c.IdStatusCompetition != 4 && c.IdStatusCompetition != 3).ToListAsync();
            await UpdateStatus(competitions);

            return await context
            .Competition
            .Select(c => new
            {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Status,
                c.Img
            }).OrderBy(c => c.IdCompetition).ToListAsync();
        }

        public async Task UpdateStatus(List<Competition> competitions)
        {
            foreach (Competition competition in competitions)
            {
                if (competition.DateStart > DateTime.Today)
                {
                    competition.IdStatusCompetition = 1;
                }
                else if (competition.DateStart <= DateTime.Today && competition.DateFinish >= DateTime.Today)
                {
                    competition.IdStatusCompetition = 2;
                }
                else if (competition.DateFinish < DateTime.Today)
                {
                    competition.IdStatusCompetition = 3;
                }
                context.Entry(competition).State = EntityState.Modified;
                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }
        }

        public async Task<object> GetCompetitionById(int id)
        {
            return await context.Competition.Select(c => new {
                c.IdCompetition,
                c.IdUser,
                c.NameCompetition,
                c.DescriptionCompetition,
                c.Organizer,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Img,
                c.Status.NameStatus,
                c.IdStatusCompetition,
            }).FirstOrDefaultAsync(com => com.IdCompetition == id);
        }

        public async Task<Competition> AddCompetition(Competition competition)
        {
            context.Competition.Add(competition);
            await context.SaveChangesAsync();


            return competition;
        }

        public async Task<Competition> ChangeCompetition(int id, Competition competition)
        {
            context.Entry(competition).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return competition;
        }

        public bool CompetitionExists(int id)
        {
            return context.Competition.Any(e => e.IdCompetition == id);
        }

        public async Task<object> GetCompetitionByCity(string city)
        {
            return await context.Competition.Where(c => c.CityCompetition == city).Select(c => new {
                c.IdCompetition,
                c.Organizer,
                c.NameCompetition,
                c.DescriptionCompetition,
                start = c.DateStart.ToShortDateString(),
                finish = c.DateFinish.ToShortDateString(),
                c.CityCompetition,
                c.Img,
                c.Status
            }).OrderBy(c => c.IdCompetition).ToListAsync();
        }

        public async Task<object> GetCompetitionsByUserAsync(int idUser)
        {
            List<Competition> competitions = await context.Competition.Where(c => c.IdUser == idUser && c.IdStatusCompetition != 4).ToListAsync();
            await UpdateStatus(competitions);
            return await context
                    .Competition
                    .Where(c => c.IdUser == idUser)
                    .Select(c => new
                    {
                        c.IdCompetition,
                        c.IdUser,
                        c.NameCompetition,
                        c.DescriptionCompetition,
                        start = c.DateStart.ToShortDateString(),
                        finish = c.DateFinish.ToShortDateString(),
                        c.CityCompetition,
                        c.IdStatusCompetition,
                        c.Status.NameStatus,
                        c.Img,
                        Groups = c
                            .Groups
                            .Select(g => new { g.IdGroup, g.NameGroup, g.Director, g.CityGroup, g.AddressGroup })
                            .ToList()
                    }).OrderByDescending(c => c.IdCompetition).ToListAsync();
        }

        public async Task<Competition> CancelCompetition(int idCompetition)
        {
            Competition competition = await context.Competition.FindAsync(idCompetition);
            if (competition == null)
            {
                return competition;
            }
            competition.IdStatusCompetition = 4;
            return await ChangeCompetition(idCompetition, competition);
        }
    }
}
