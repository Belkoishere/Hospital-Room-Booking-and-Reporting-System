import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
export class RoomService {
    constructor(repo) {
        this.repo = repo;
    }
    AddRoom(Room) {
        if (this.FindRoom(Room.RoomID) !== null) {
            return "Room cannot be added";
        }
        this.repo.save(Room);
    }
    RemoveRoom(RoomID) {
        this.repo.delete(RoomID);
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
        return this.repo.updateStatus(RoomID, NewStatus);
    }
    RemoveAllRooms() {
        this.repo.deleteAll();
    }
}
//# sourceMappingURL=RoomService.js.map