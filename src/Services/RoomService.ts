import type { RoomRepositoryStrategy } from "../Repositories/RoomRepository/RoomRepositoryStrategy.js"; 
import { Room } from "../Rooms/Rooms.js"; 
import { Status } from "../Enumerations/Status.js";

export class RoomService {
  constructor(private readonly repo: RoomRepositoryStrategy) {}

	AddRoom(Room: Room): void | string {
		if (this.FindRoom(Room.RoomID) !== null){
			return "Room cannot be added";
		}
		this.repo.save(Room);
	}

	RemoveRoom(RoomID: number): void {
		this.repo.delete(RoomID)
	}

	FindRoom(RoomID: number): Room | null {
		return this.repo.read(RoomID);
	}

	IsAvailable(RoomID: number): Boolean | string{
		const status = this.FindRoom(RoomID)?.Status;

		if (status === Status["Available"]) {
			return true;
		}
		else if (status === undefined){
			return "Room does not exist";
		}

		return false;

	}

	AllRooms(): Room[]{
		return this.repo.all();
	}

	UpdateStatus(RoomID: number, Status: Status): void{
		return this.repo.update();
	}

	RemoveAllRooms(): void{
		this.repo.deleteAll();
	}

}