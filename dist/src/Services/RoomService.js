import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
//Room service conatins all operations relevant to the room domain
export class RoomService {
    constructor(repo) {
        this.repo = repo;
    }
    AddRoom(Room) {
        if (this.FindRoom(Room.RoomID) !== null) {
            return "Room cannot be added";
        }
        this.repo.save(Room);
        return "Room added";
    }
    RemoveRoom(RoomID) {
        this.repo.delete(RoomID);
        return "Room removed";
    }
    FindRoom(RoomID) {
        return this.repo.read(RoomID);
    }
    IsAvailable(RoomID) {
        const status = this.FindRoom(RoomID)?.Status;
        if (status === Status["Available"]) {
            return true;
        }
        else if (status === undefined) {
            return "Room does not exist";
        }
        return false;
    }
    AllRooms() {
        return this.repo.all();
    }
    UpdateStatus(RoomID, NewStatus) {
        this.repo.updateStatus(RoomID, NewStatus);
        return "Room status updated";
    }
    RemoveAllRooms() {
        this.repo.deleteAll();
        return "All rooms removed";
    }
}
//# sourceMappingURL=RoomService.js.map