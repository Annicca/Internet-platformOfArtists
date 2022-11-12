using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class User
    {
        [Key]
        [JsonPropertyName("idUser")]
        public int idUser { get; set; }
        public string surnameUser { get; set; }
        public string nameUser { get; set; }
        public string patronimycUser { get; set; }
        public string loginUser { get; set; }
        public string passwordUser { get; set; }
        public string mailUser { get; set; }
    }
}
