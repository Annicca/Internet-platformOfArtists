using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [JsonPropertyName("idUser")]
        public int IdUser { get; set; }
        public User User { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("city")]
        public string City { get; set; }

        [JsonPropertyName("status")]
        public string StatusStatement { get; set; }

    }
}
