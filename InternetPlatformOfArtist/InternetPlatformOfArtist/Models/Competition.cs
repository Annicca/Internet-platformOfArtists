using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [ForeignKey("Organizer")]
        [JsonPropertyName("idUser")]
        public int IdUser { get; set; }
        public User Organizer { get; set; }

        [JsonPropertyName("nameCompetition")]
        public string NameCompetition { get; set; }

        [JsonPropertyName("descriptionCompetition")]
        public string DescriptionCompetition { get; set; }

        [JsonPropertyName("dateStart")]
        [DataType(DataType.Date)]
        
        public DateTime DateStart { get; set; }

        [JsonPropertyName("dateFinish")]
        [DataType(DataType.Date)]

        public DateTime DateFinish { get; set; }

        [JsonPropertyName("cityCompetition")]
        public string CityCompetition {get;set;}

        [JsonPropertyName("img")]
        public string Img { get; set; }

        [ForeignKey("Status")]
        [JsonPropertyName("idStatusCompetition")]
        public int IdStatusCompetition { get; set; }
        public StatusCompetition Status { get; set; }

        public List<Group> Groups { get; set; } = new List<Group>();

        [Newtonsoft.Json.JsonIgnore]
        [System.Text.Json.Serialization.JsonIgnore]
        public List<Participant> Participants { get; set; } = new List<Participant>();

        private static string[] DefaultImageCompetition =
{
            "random1.jpg",
            "random2.jpg",
            "random3.jpg",
            "random4.jpg",
            "random5.jpg",
            "random6.jpg",
            "random7.jpg",
            "random8.jpg",
            "random9.jpg",
            "random10.jpg",
            "random11.jpg",
            "tanzuiipoi.jpg"
        };

        public string RandomDefaultImageCompetition()
        {
            return "/static/Images/Competition/" + DefaultImageCompetition[new Random().Next(0, DefaultImageCompetition.Length)];
        }

    }
}
