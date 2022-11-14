using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Group
    {
        [Key]
        [JsonPropertyName("idGroup")]
        public int IdGroup { get; set; }

        [JsonPropertyName("director")]
        public int IdUser { get; set; }


        [JsonPropertyName("descriptionGroup")]
        public string DescriptionGroup { get; set; }

        [JsonPropertyName("cityGroup")]
        public string CityGroup { get; set; }

        [JsonPropertyName("addressGroup")]
        public string AddressGroup { get; set; }

        public List<Competition> Competitions;
        public User Director { get; set; }
        public Group()
        {
            Competitions = new List<Competition>();
        }
    }
}
