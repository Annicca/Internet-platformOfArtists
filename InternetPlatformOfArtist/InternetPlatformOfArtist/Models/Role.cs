using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Role
    {
        [Key]
        public int IdRole { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}
