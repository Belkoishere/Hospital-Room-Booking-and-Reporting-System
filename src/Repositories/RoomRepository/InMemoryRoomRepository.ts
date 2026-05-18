import type { RoomRepositoryStrategy } from "./RoomRepositoryStrategy.js";
import { Room } from "../../Rooms/Rooms.js";

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

  update(): void {

  }

}