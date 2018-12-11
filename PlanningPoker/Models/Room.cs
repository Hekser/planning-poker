using System;
using System.Collections.Generic;

namespace PlanningPoker.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        
        public string RoomName { get; set; }

        public IEnumerable<Member> Members { get; set; }
    }
}
