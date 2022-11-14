using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
    }
}
