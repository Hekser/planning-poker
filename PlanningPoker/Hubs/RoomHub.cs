using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
    public class RoomHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
