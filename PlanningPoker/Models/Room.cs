using System;
using System.Collections.Generic;

namespace PlanningPoker.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        
        public string RoomName { get; set; }

        public IList<Member> Members { get; set; }

        public IList<Task> Tasks { get; set; }

        public IList<ProposeEstimationTime> ProposeEstimations { get; set; }
    }
}
