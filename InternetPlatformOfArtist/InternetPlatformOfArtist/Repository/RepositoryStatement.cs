using InternetPlatformOfArtist.Context;
using InternetPlatformOfArtist.IRepository;
using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using InternetPlatformOfArtist.Controllers;
using InternetPlatformOfArtist.Helpers;

namespace InternetPlatformOfArtist.Repository
{
    public class RepositoryStatement : IStatementRepository
    {
        private readonly ArtContext context;
        private readonly ICompetitionRepository repositoryCompetition;
        private readonly IGroupRepository repositoryGroup;

        public RepositoryStatement(ArtContext _context, ICompetitionRepository _repositoryCompetition, IGroupRepository _repositoryGroup)
        {
            context = _context;
            repositoryCompetition = _repositoryCompetition;
            repositoryGroup = _repositoryGroup;
        }
        private readonly int groupType = 1;
        private readonly int competitionType = 2;
        private readonly int statusAccept = 1;
        private readonly int roleDirector = 3;
        private readonly int roleOrganizer = 4;
        private readonly int roleAdmin = 1;

        public async Task<ActionResult<IEnumerable<Statement>>> Get()
        {
            return await context.Statement.Include("User").Include("Type").Include("Status").OrderByDescending(s => s.IdStatement).ToListAsync();
        }

        public async Task<Statement> GetStatementById(int id)
        {
            return await context.Statement.Include("User").Include("Type").Include("Status").FirstAsync(s => s.IdStatement == id);
        }

        public async Task<Statement> AddStatement(Statement statement)
        {
            var user = await context.User.FindAsync(statement.IdUser);
            if(user == null)
            {
                return null;
            } else if(statement.IdType == 1 && (user.IdRole == roleDirector || user.IdRole == roleAdmin))
            {

                context.Statement.Add(statement);

            } else if(statement.IdType == 2 && (user.IdRole == roleOrganizer || user.IdRole == roleAdmin))
            {
                context.Statement.Add(statement);
            }
            else
            {
                return null;
            }
            
            await context.SaveChangesAsync();

            return statement;
        }

        public async Task<Statement> ChangeStatement(int id, int idStatusStatement)
        {
            int role = 0;
            var statement = await context.Statement.FindAsync(id);
            if (statement == null)
            {
                return statement;
            }
            statement.IdStatusStatement = idStatusStatement;

            context.Entry(statement).State = EntityState.Modified;
            await context.SaveChangesAsync();

            if (statement.IdStatusStatement == statusAccept && statement.IdType == groupType)
            {
                var group = new Models.Group();
                group.IdUser = statement.IdUser;
                group.NameGroup = statement.Name;
                group.DescriptionGroup = statement.Description;
                group.CityGroup = statement.City;
                group.AddressGroup = statement.Address;
                await repositoryGroup.AddGroup(group);
                role = roleDirector;
            }
            else if (statement.IdStatusStatement == statusAccept && statement.IdType == competitionType)
            {
                var competition = new Models.Competition();
                competition.IdUser = statement.IdUser;
                competition.NameCompetition = statement.Name;
                competition.DescriptionCompetition = statement.Description;
                competition.CityCompetition = statement.City;
                competition.DateStart = (DateTime)statement.DateStart;
                competition.DateFinish = (DateTime)statement.DateFinish;
                competition.IdStatusCompetition = 1;
                await repositoryCompetition.AddCompetition(competition);
                role = roleOrganizer;
            }
            else
            {
                return null;
            }

            if (role != 0)
            {
                var userChangeRole = await ChangeUserRole(statement.IdUser, role);
                if (userChangeRole == null)
                {
                    return null;
                }
            }

            return statement;
        }

        private async Task<User> ChangeUserRole(int id, int idRole)
        {
            var user = context.User.Find(id);
            if (user == null)
            {
                return user;
            }

            if (user.IdRole != idRole)
            {
                    user.IdRole = idRole;
                    context.Entry(user).State = EntityState.Modified;
                    await context.SaveChangesAsync();
            }

            return user;
        }

        public bool StatementExists(int id)
        {
            return context.Statement.Any(s => s.IdStatement == id);
        }

        public async Task<object> GetStatementByUserAsync(int idUser)
        {
            return
                   await context.Statement.Select(s =>
                    new
                    {
                        s.IdStatement,
                        s.Name,
                        s.IdUser,
                        s.City,
                        s.Address,
                        s.Description,
                        start = s.DateStart,
                        finish = s.DateFinish,
                        type = s.Type.NameType,
                        status = s.Status.NameStatus
                    }
                    ).Where(s => s.IdUser == idUser).OrderByDescending(s => s.IdStatement).ToListAsync();
        }

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
