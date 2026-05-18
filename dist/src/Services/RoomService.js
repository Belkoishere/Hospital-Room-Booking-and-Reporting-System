import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
export class RoomService {
    constructor(repo) {
        this.repo = repo;
    }
    AddRoom(Room) {
        this.repo.save(Room);
    }
    RemoveRoom(RoomID) {
        this.repo.delete(RoomID);
    }
    FindRoom(RoomID) {
        return this.repo.read(RoomID);
    }
    IsAvailable(RoomID) {
        if (this.FindRoom(RoomID)?.Status == Status["Available"]) {
            return true;
        }
        else {
            return false;
        }
    }
    AllRooms() {
        return this.repo.all();
    }
    UpdateStatus(RoomID, Status) {
        return this.repo.update();
    }
    RemoveAllRooms() {
        this.repo.deleteAll();
    }
}
//# sourceMappingURL=RoomService.js.map