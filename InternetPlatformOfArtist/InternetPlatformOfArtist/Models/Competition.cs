using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Competition
    {
        [Key]
        [JsonPropertyName("idCompetition")]
        public int IdCompetition { get; set; }

        [JsonPropertyName("organizor")]
        public int IdUser { get; set; }
        public User Organizor { get; set; }

        [JsonPropertyName("nameCompetition")]
        public string NameCompetition { get; set; }

        [JsonPropertyName("descriptionCompetition")]
        public string DescriptionCompetition { get; set; }

        [JsonPropertyName("dateStart")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateStart { get; set; }

        [JsonPropertyName("dateFinish")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateFinish { get; set; }

        [JsonPropertyName("cityCompetition")]
        public string CityCompetition {get;set;}

        [JsonPropertyName("statusCompetition")]
        public string StatusCompetition { get; set; }

        public List<Group> Participants { get; set; }

        public Competition()
        {
            Participants = new List<Group>();
        }
    }
}
