using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Order
    {
        [Key]
        public int IdOrder { get; set; }
        public int IdUser { get; set; }
        public DateTime DateOrder { get; set; }
        public DateTime DateArrivall { get; set; }
        public string Address { get; set; }
        public double Cost { get; set; }
        public string StatusOrder { get; set; }
        public string StatusPayment {get; set; }
    }
}
