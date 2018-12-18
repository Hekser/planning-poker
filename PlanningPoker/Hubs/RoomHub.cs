using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using PlanningPoker.Logic.Services;
using PlanningPoker.Models;
using System;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
  [EnableCors("AllowAny")]
  public class RoomHub : Hub
  {
    private StorageService storage = StorageService.Instance;

    public override async Task OnConnectedAsync()
    {
      await Clients.All.SendAsync("ReceiveMessage", "test");
      await base.OnConnectedAsync();
    }

    // public override async Task OnDisconnectedAsync(Exception exception)
    // {
    //     await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
    //     await base.OnDisconnectedAsync(exception);
    // }

    public async Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task CreateRoom(string nickName, string roomName)
    {
      await Execute(async () =>
      {
        storage.CreateRoom(roomName, new Member() { Nick = nickName, Role = Role.Admin, MemberId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("RefreshRoomMembers", JsonConvert.SerializeObject(storage.GetRoomMembers(roomName)));
        await Clients.All.SendAsync("ReceiveMessage", "Created room: " + roomName);
        // await Clients.Caller.SendAsync("GenerateRoomName", $"room-{DateTime.Now}");
      });
    }

    public async Task JoinRoom(string nickName, string roomName)
    {
      await Execute(async () =>
      {
        storage.AddMember(roomName, new Member() { Nick = nickName, Role = Role.Member, MemberId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("RefreshRoomMembers", JsonConvert.SerializeObject(storage.GetRoomMembers(roomName)));
      });
    }

    public async Task LeaveRoom(string roomName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
    }

    private Task Execute(Action action)
    {
      try
      {
        return Task.Run(() => action());
      }
      catch (HubException ex)
      {
        return Clients.Caller.SendAsync("ReceiveMessage", ex.Message);
      }
      catch (Exception)
      {
        return Clients.Caller.SendAsync("ReceiveMessage", "Ups! Coś poszło nie tak!");
      }
    }
  }
}
