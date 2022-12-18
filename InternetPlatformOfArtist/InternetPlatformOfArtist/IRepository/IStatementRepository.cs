using InternetPlatformOfArtist.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.IRepository
{
    public interface IStatementRepository
    {
        Task<ActionResult<IEnumerable<Statement>>> Get();
        Task<Statement> GetStatementById(int id);
        Task<Statement> AddStatement(Statement statement);
        Task<Statement> ChangeStatement(int id, int idStatusStatement);
        Task<object> GetStatementByUserAsync(int idUser);
        bool StatementExists(int id);
    }
}
