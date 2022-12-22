using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Helpers
{
    public class JwtServiceAuthentication
    {
        private string secureKey;
        public JwtServiceAuthentication(string secureKey)
        {
            this.secureKey = secureKey;
        }
        //public string Geterate(int id)
        //{
        //    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
        //    var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        //    var header = new JwtHeader(credentials);

        //    var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(90));
        //    var securetyToken = new JwtSecurityToken(header, payload);

        //    return new JwtSecurityTokenHandler().WriteToken(securetyToken);
        //}

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters 
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
