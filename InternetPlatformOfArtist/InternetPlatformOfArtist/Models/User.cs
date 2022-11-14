using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class User
    {
        [Key]
        [JsonPropertyName("idUser")]
        public int IdUser { get; set; }

        [JsonPropertyName("surnameUser")]
        public string SurnameUser { get; set; }

        [JsonPropertyName("nameUser")]
        public string NameUser { get; set; }

        [JsonPropertyName("patronimycUser")]
        public string PatronimycUser { get; set; }

        [JsonPropertyName("loginUser")]
        public string LoginUser { get; set; }

        [JsonPropertyName("passwordUser")]
        public string PasswordUser { get; set; }

        [JsonPropertyName("mailUser")]
        public string MailUser { get; set; }

        [ForeignKey("UserRole")]
        public int IdRole { get; set; }
        public Role UserRole { get; set; }

        //public User()
        //{

        //}

        //public User(string surnameUser, string nameUser, string patronimycUser, string loginUser, string passwordUser,string mailUser, int IdRole)
        //{
        //    this.SurnameUser = surnameUser;
        //    this.NameUser = nameUser;
        //    this.PatronimycUser = patronimycUser;
        //    this.LoginUser = loginUser;
        //    this.PasswordUser = passwordUser;
        //    this.MailUser = mailUser;
        //    this.IdRole = IdRole;
        //}

        //public User(int idUser, string surnameUser, string nameUser, string patronimycUser, string loginUser, string passwordUser, string mailUser, int IdRole)
        //{
        //    this.IdUser = idUser;
        //    this.SurnameUser = surnameUser;
        //    this.NameUser = nameUser;
        //    this.PatronimycUser = patronimycUser;
        //    this.LoginUser = loginUser;
        //    this.PasswordUser = passwordUser;
        //    this.MailUser = mailUser;
        //    this.IdRole = IdRole;
        //}
    }
}
