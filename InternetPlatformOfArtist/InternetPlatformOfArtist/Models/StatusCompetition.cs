using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class StatusCompetition
    {
        [Key]
        public int IdStatusCompetition { get; set; }
        public string NameStatus { get; set; }
    }
}
