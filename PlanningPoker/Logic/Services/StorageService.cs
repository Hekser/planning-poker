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
			validator.CheckAdminPermission(member.Role);
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

		public void RemoveMember(string connectionId)
		{
			var roomsIdsToRemove = new List<int>();
			
			foreach (var room in Rooms)
			{
				room.Members = room.Members.Where(x => x.MemberId != connectionId).ToList();

				if (room.Members.Count == 0)
				{
					roomsIdsToRemove.Add(room.RoomId);
				}
			}

			RemoveRooms(roomsIdsToRemove);
		}

		private void RemoveRooms(IEnumerable<int> roomsIds)
		{
			Rooms = Rooms.Where(x => !roomsIds.Contains(x.RoomId)).ToList();
		}
	}
}
