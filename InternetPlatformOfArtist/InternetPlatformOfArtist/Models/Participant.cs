using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Participant
    {
        [ForeignKey("CompetitionParticipant")]
        [JsonPropertyName("idCompetition")]
        public int IdCompetition { get; set; }
        public Competition CompetitionParticipant { get; set; }

        [ForeignKey("GroupParticipant")]
        [JsonPropertyName("idGroup")]
        public int IdGroup { get; set; }
        public Group GroupParticipant { get; set; }

        public Participant(int idCompetition, int idGroup)
        {
            this.IdCompetition = idCompetition;
            this.IdGroup = idGroup;
        }
    }
}
