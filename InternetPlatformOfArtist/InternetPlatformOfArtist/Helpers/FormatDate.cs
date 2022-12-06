using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternetPlatformOfArtist.Helpers
{
    public class FormatDate
    {
        private static Context.ArtContext context;
        public FormatDate(Context.ArtContext _context)
        {
            context = _context;
        }
        public async void ChangeStatus() {
            List<Models.Competition> competitionList = context.Competition.ToList();
            foreach (Models.Competition c in competitionList)
            {
                if(c.IdStatusCompetition != 4)
                {
                    if (c.DateStart == DateTime.Today)
                    {
                        c.IdStatusCompetition = 2;
                        context.Entry(c).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                    }
                    else if(c.DateFinish > DateTime.Today){
                        c.IdStatusCompetition = 3;
                        context.Entry(c).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                    }
                    else if(c.DateStart < DateTime.Today)
                    {
                        c.IdStatusCompetition = 2;
                        context.Entry(c).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                    }
                }

                
            }
        }
    }
}
