using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class ShopingItem
    {
        [Key]
        public int IdShopigItem { get; set; }
        public int IdOrder { get; set; }
        public int IdProduct { get; set; }
        public int Count { get; set; }
    }
}
