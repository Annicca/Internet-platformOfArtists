using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Statement
    {
        [Key]
        [JsonPropertyName("idStatement")]
        public int IdStatement { get; set; }

        [ForeignKey("User")]
        [JsonPropertyName("idUser")]
        public int IdUser { get; set; }
        public User User { get; set; }

        [ForeignKey("Type")]
        [JsonPropertyName("idType")]
        public int IdType { get; set; }
        public TypeStatement Type { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("city")]
        public string City { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [ForeignKey("Status")]
        [JsonPropertyName("idStatusStatement")]
        public int? IdStatusStatement { get; set; }
        public StatusStatement Status { get; set; }

    }
}
