using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [ForeignKey("Director")]
        [JsonPropertyName("idUser")]
        public int IdUser { get; set; }
        public User Director { get; set; }

        [JsonPropertyName("nameGroup")]
        public string NameGroup { get; set; }

        [JsonPropertyName("descriptionGroup")]
        public string DescriptionGroup { get; set; }

        [JsonPropertyName("cityGroup")]
        public string CityGroup { get; set; }

        [JsonPropertyName("addressGroup")]
        public string AddressGroup { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("imgUrl")]
        public string Img { get; set; }

        public List<Competition> Competitions { get; set; } = new List<Competition>();

        [Newtonsoft.Json.JsonIgnore]
        [System.Text.Json.Serialization.JsonIgnore]
        public List<Participant> Participants { get; set; } = new List<Participant>();
    }
}
