using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Product
    {
        [Key]
        public int IdCompetition { get; set; }
        public string NameProduct{ get; set; }
        public string DescriptionProduct { get; set; }
        public string Size { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
    }
}
