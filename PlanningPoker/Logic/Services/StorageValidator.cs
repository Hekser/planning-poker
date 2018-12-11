using System.Collections.Generic;
using System.Linq;
using PlanningPoker.Exceptions;
using PlanningPoker.Models;

namespace PlanningPoker.Logic.Services
{
    public class StorageValidator
    {
        public void CheckAdminPermission(Role role)
        {
            if (role != Role.Admin) { throw new HubException("Nie posiadasz wymaganych uprawnień!"); }
        }

        public void CheckRoomName(IEnumerable<Room> rooms, string roomName)
        {
            if (rooms.Any(x => x.RoomName == roomName))
            {
                throw new HubException("Pokój o takiej nazwie już istnieje!");
            }
        }

        public void CheckIfRoomNameExists(IEnumerable<Room> rooms, string roomName)
        {
            if (!rooms.Any(x => x.RoomName == roomName))
            {
                throw new HubException("Pokój o takiej nazwie nie istnieje!");
            }
        }
    }
}
