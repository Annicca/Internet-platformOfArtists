using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    interface IStatement<T>
    {
        public int IdStatement { get; set; }
        public T Art {get;set;}
        public string StatusStatement { get; set; }

    }
}
