import { Room } from "../../Rooms/Rooms.js";
export class InMemoryRoomRepository {
    constructor() {
        this.Rooms = new Map();
    }
    read(RoomID) {
        return this.Rooms.get(RoomID) ?? null;
    }
    save(Room) {
        this.Rooms.set(Room.RoomID, Room);
    }
    all() {
        return [...this.Rooms.values()];
    }
    delete(RoomID) {
        this.Rooms.delete(RoomID);
    }
    deleteAll() {
        this.Rooms.clear();
    }
    updateStatus(RoomID, NewStatus) {
        let Room = this.read(RoomID);
        if (!Room) {
            return "Room does not exist";
        }
        else {
            let NewRoom = Room;
            NewRoom.Status = NewStatus;
            this.Rooms.set(RoomID, NewRoom);
        }
    }
}
//# sourceMappingURL=InMemoryRoomRepository.js.map