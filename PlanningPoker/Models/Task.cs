namespace PlanningPoker.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        public string Title { get; set; }

        public TaskStatus Status { get; set; }

        public int? EstimatedTime { get; set; }
    }
}
