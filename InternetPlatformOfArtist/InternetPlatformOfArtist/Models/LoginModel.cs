using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class LoginModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public LoginModel(string login, string password)
        {
            this.Login = login;
            this.Password = password;
        }
    }
}
