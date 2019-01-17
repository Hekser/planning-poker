using System;
using System.Collections.Generic;
using System.Linq;
using PlanningPoker.Models;

namespace PlanningPoker.Logic.Services
{
	public sealed class StorageService
	{
		private static readonly Lazy<StorageService> instance = new Lazy<StorageService>(() => new StorageService());
		private readonly StorageValidator validator;
		private IList<Room> Rooms { get; set; }
		private static int nextRoomId;
		
		public static StorageService Instance { get => instance.Value; }
		
		private StorageService()
		{
			this.validator = new StorageValidator();
			Rooms = new List<Room>();
			nextRoomId = 1;
		}

		public void CreateRoom(string roomName, Member member)
		{
			validator.CheckAdminPermission(member);
			validator.CheckRoomName(Rooms, roomName);

			Rooms.Add(
				new Room
				{
					RoomName = roomName,
					Members = new List<Member>() { member },
					RoomId = nextRoomId++
				}
			);
		}

		public void AddMember(string roomName, Member member)
		{
			validator.CheckIfRoomNameExists(Rooms, roomName);

			Rooms.First(x => x.RoomName == roomName).Members.Add(member);
		}

		public IEnumerable<Member> GetRoomMembers(string roomName)
		{
			validator.CheckIfRoomNameExists(Rooms, roomName);

			return Rooms.First(x => x.RoomName == roomName).Members;
		}

		public void StartPlanning(string connectionId, Room room)
		{
			CheckAdminPermission(connectionId, room);
		}

        public Task AddTask(string connectionId, Room room, string name)
        {
			CheckAdminPermission(connectionId, room);
			var task = new Task
			{
				Id = room.Tasks.Count,
				Title = name,
				EstimatedTime = null,
				Status = TaskStatus.NotEstimated
			};

			room.Tasks.Add(task);
			
			return task;
        }

		public string RemoveMember(string connectionId)
		{
			var room = Rooms.FirstOrDefault(r => r.Members.Select(x => x.ConnectionId).Contains(connectionId));

			room.Members = room.Members.Where(x => x.ConnectionId != connectionId).ToList();

			if (room.Members.Count == 0)
			{
				Rooms = Rooms.Where(x => x.RoomId != room.RoomId).ToList();
			}

			return room.RoomName;
		}

		public Room GetMembersRoom(string connectionId)
		{
			var room = Rooms.FirstOrDefault(x => x.Members.Select(member => member.ConnectionId).Contains(connectionId));
			if (room == null) { validator.Throw("Użytkownik nie dołączył do żadnego pokoju!"); }
			return room;
		}

		private void CheckAdminPermission(string connectionId, Room room)
		{
			var member = room.Members.FirstOrDefault(x => x.ConnectionId == connectionId);
			validator.CheckAdminPermission(member);
		}
    }
}
