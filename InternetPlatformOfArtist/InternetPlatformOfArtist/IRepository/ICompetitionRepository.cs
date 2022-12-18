using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.IRepository
{
    public interface ICompetitionRepository
    {
        Task<object> GetAllCompetition();
        Task<object> GetCompetitionById(int id);
        Task<Competition> AddCompetition(Competition entity);
        Task<Competition> ChangeCompetition(int id, Competition entity);
        Task<object> GetCompetitionByCity(string city);
        Task<object> GetCompetitionsByUserAsync(int idUser);
        Task<Competition> CancelCompetition(int id);
        bool CompetitionExists(int id);
    }
}
