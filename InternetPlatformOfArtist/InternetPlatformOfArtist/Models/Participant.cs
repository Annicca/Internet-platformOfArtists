using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetPlatformOfArtist.Models
{
    public class Participant
    {
        public int IdCompetition { get; set; }
        public Competition CompetitionParticipant { get; set; }

        public int IdGroup { get; set; }
        public Group GroupParticipant { get; set; }
    }
}
