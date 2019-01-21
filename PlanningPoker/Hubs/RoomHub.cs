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
      await Clients.Caller.SendAsync("OnConnected", Context.ConnectionId);
      await base.OnConnectedAsync();
    }

    public override async System.Threading.Tasks.Task OnDisconnectedAsync(Exception exception)
    {
      var roomName = storage.RemoveMember(Context.ConnectionId);
      this.RefreshRoom(roomName);
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
      await base.OnDisconnectedAsync(exception);
    }

    public async System.Threading.Tasks.Task SendMessage(string user, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public void CreateRoom(string nickName, string roomName)
    {
      Execute(async () =>
      {
        storage.CreateRoom(roomName, new Member() { Nick = nickName, Role = Role.Admin, ConnectionId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Caller.SendAsync("CreateRoom", roomName);
      });
    }

    public void JoinRoom(string nickName, string roomName)
    {
      Execute(async () =>
      {
        storage.AddMember(roomName, new Member() { Nick = nickName, Role = Role.Member, ConnectionId = Context.ConnectionId });
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Caller.SendAsync("JoinRoom", roomName);
      });
    }

    public void RefreshRoom(string roomName)
    {
      Execute(async () =>
      {
        await Clients.Group(roomName).SendAsync("RefreshRoom", JsonConvert.SerializeObject(storage.GetRoomMembers(roomName)));
      });
    }

    public void StartPlanning()
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        storage.StartPlanning(Context.ConnectionId, room);
        await Clients.Group(room.RoomName).SendAsync("PlanningStarted");
      });
    }

    public void AddTask(string name)
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        var task = storage.AddTask(Context.ConnectionId, room, name);
        await Clients.Group(room.RoomName).SendAsync("TaskAdded", task);
      });
    }

    public void ChangeTaskStatus(int id, Models.TaskStatus taskStatus)
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        var task = storage.ChangeStatus(Context.ConnectionId, room, id, taskStatus);
        await Clients.Group(room.RoomName).SendAsync("TaskChanged", task);
      });
    }

    public void StartEstimating()
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        storage.StartEstimating(Context.ConnectionId, room);
        await Clients.Group(room.RoomName).SendAsync("EstimatingStarted");
      });
    }

    public void ProposeEstimationTime(int estimatedTime)
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        var response = storage.ProposeEstimationTime(Context.ConnectionId, room, estimatedTime);

        if (response.Item1)
        {
          await Clients.Group(room.RoomName).SendAsync("EstimationFinished", response.Item2);
        }
        else
        {
          await Clients.Group(room.RoomName).SendAsync("EstimationTimeProposed", Context.ConnectionId);
        }
      });
    }

    public void ConfirmEstimationTime(int estimatedTime)
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        var task = storage.ConfirmEstimationTime(Context.ConnectionId, room, estimatedTime);
        await Clients.Group(room.RoomName).SendAsync("TaskChanged", task);
      });
    }

    public void FinishPlanning()
    {
      Execute(async () => {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        storage.FinishPlanning(Context.ConnectionId, room);
        await Clients.Group(room.RoomName).SendAsync("PlanningFinished");
      });
    }

    public void LeaveRoom(string roomName)
    {
      Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
    }

    private async void Execute(Func<System.Threading.Tasks.Task> action)
    {
      try
      {
        await action();
      }
      catch (PlanningPoker.Exceptions.HubException ex)
      {
        await Clients.Caller.SendAsync("ErrorOccured", ex.Message);
      }
      catch (Exception)
      {
        await Clients.Caller.SendAsync("ErrorOccured", "Ups! Coś poszło nie tak!");
      }
    }
  }
}
