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

    public override async System.Threading.Tasks.Task OnConnectedAsync()
    {
      await Clients.All.SendAsync("OnConnected", Context.ConnectionId);
      await base.OnConnectedAsync();
    }

    public override async System.Threading.Tasks.Task OnDisconnectedAsync(Exception exception)
    {
      var roomName = storage.RemoveMember(Context.ConnectionId);
      await this.RefreshRoom(roomName);
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
      await base.OnDisconnectedAsync(exception);
    }

    public async System.Threading.Tasks.Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async System.Threading.Tasks.Task CreateRoom(string nickName, string roomName)
    {
      await Execute(async () =>
      {
        storage.CreateRoom(roomName, new Member() { Nick = nickName, Role = Role.Admin, ConnectionId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Caller.SendAsync("CreateRoom", roomName);
      });
    }

    public async System.Threading.Tasks.Task JoinRoom(string nickName, string roomName)
    {
      await Execute(async () =>
      {
        storage.AddMember(roomName, new Member() { Nick = nickName, Role = Role.Member, ConnectionId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Caller.SendAsync("JoinRoom", roomName);
      });
    }

    public async System.Threading.Tasks.Task RefreshRoom(string roomName)
    {
      await Execute(async () =>
      {
        await Clients.Group(roomName).SendAsync("RefreshRoom", JsonConvert.SerializeObject(storage.GetRoomMembers(roomName)));
      });
    }

    public async System.Threading.Tasks.Task StartPlanning()
    {
      await Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        storage.StartPlanning(Context.ConnectionId, room);
        await Clients.Group(room.RoomName).SendAsync("PlanningStarted");
      });
    }

    public async System.Threading.Tasks.Task AddTask(string name)
    {
      await Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        var task = storage.AddTask(Context.ConnectionId, room, name);
        await Clients.Group(room.RoomName).SendAsync("TaskAdded", task);
      });
    }

    public async System.Threading.Tasks.Task LeaveRoom(string roomName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
    }

    private System.Threading.Tasks.Task Execute(Action action)
    {
      try
      {
        return System.Threading.Tasks.Task.Run(() => action());
      }
      catch (HubException ex)
      {
        return Clients.Caller.SendAsync("ErrorOccured", ex.Message);
      }
      catch (Exception)
      {
        return Clients.Caller.SendAsync("ErrorOccured", "Ups! Coś poszło nie tak!");
      }
    }
  }
}
