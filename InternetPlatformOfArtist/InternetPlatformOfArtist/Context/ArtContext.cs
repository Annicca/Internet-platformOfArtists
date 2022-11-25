using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using InternetPlatformOfArtist.Models;

namespace InternetPlatformOfArtist.Context
{
    public class ArtContext : DbContext
    {
        public ArtContext(DbContextOptions<ArtContext> options)
           : base(options)
        {

        }
        public DbSet<Models.User> User { get; set; }
        public DbSet<Models.Group> Group { get; set; }
        public DbSet<Models.Competition> Competition { get; set; }
        public DbSet<Models.Statement> Statement{ get; set; }
        public DbSet<Models.Role> Role { get; set; }
        public DbSet<Models.StatusCompetition> StatusCompetition { get; set; }
        public DbSet<Models.StatusStatement> StatusStatement { get; set; }
        public DbSet<Models.Participant> Participant { get; set; }
        public DbSet<Models.TypeStatement> TypeStatement { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Competition>(c =>
            {

                c.HasMany(i => i.Groups)
                 .WithMany(c => c.Competitions)
                 .UsingEntity<Participant>(
                    group => group
                        .HasOne(gp => gp.GroupParticipant)
                        .WithMany(p => p.Participants)
                        .HasForeignKey(i => i.IdGroup),
                    competition => competition
                        .HasOne(cp => cp.CompetitionParticipant)
                        .WithMany(p => p.Participants)
                        .HasForeignKey(i => i.IdCompetition)
                 
                );
            });
        }

    }
}
