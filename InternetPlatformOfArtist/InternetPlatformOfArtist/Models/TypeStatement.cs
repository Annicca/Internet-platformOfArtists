using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class TypeStatement
    {
        [Key]
        public int IdTypeStatement { get; set; }
        public string NameType { get; set; }
    }
}
