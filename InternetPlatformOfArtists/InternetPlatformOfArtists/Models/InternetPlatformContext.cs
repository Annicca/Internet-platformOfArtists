using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


namespace InternetPlatformOfArtists.Models
{
    public class InternetPlatformContext
    {
        public string ConnectionString { get; set; }
        public InternetPlatformContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
    }
}
