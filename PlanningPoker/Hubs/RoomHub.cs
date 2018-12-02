using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
    [EnableCors("AllowAny")]
    public class RoomHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task CreateRoom(string roomOwnerName)
        {
            await Clients.Caller.SendAsync("GenerateRoomName", $"room-{DateTime.Now}");
        }

        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("MemberJoined", Context.ConnectionId + " joined.");
        }

        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
