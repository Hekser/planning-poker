using System;

namespace PlanningPoker.Exceptions
{
    public class HubException: Exception
    {
        public HubException()
            : base()
        {
            
        }

        public HubException(string message)
            : base(message)
        {
            
        }

        public HubException(string message, Exception innerException)
            : base(message, innerException)
        {
            
        }
    }
}
