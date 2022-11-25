using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class StatusStatement
    {
        [Key]
        [JsonPropertyName("idStatus")]
        public int IdStatusStatement { get; set; }
        [JsonPropertyName("nameStatus")]
        public string NameStatus { get; set; }
    }
}
