import type { RoomRepositoryStrategy } from "./RoomRepositoryStrategy.js";
import { Room } from "../../Rooms/Rooms.js";
import type { Status } from "../../Enumerations/Status.js";

//A concrete room storage method
export class InMemoryRoomRepository implements RoomRepositoryStrategy {
  private readonly Rooms = new Map<number, Room>();

  read(RoomID: number): Room | null {
    return this.Rooms.get(RoomID) ?? null;
  }

  save(Room: Room): void {
    this.Rooms.set(Room.RoomID, Room);
  }

  all(): Room[] {
    return [...this.Rooms.values()];
  }

  delete(RoomID: number): void {
    this.Rooms.delete(RoomID);
  }

  deleteAll(): void {
    this.Rooms.clear();
  }

  updateStatus(RoomID: number, NewStatus: Status): void | string {
    let Room = this.read(RoomID);

    if(!Room){
      return "Room does not exist";
    }
    else {
      let NewRoom = Room;
      NewRoom.Status = NewStatus;
      this.Rooms.set(RoomID, NewRoom);
    }
  }

}