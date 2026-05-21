import type { RoomRepositoryStrategy } from "../Repositories/RoomRepository/RoomRepositoryStrategy.js"; 
import { Room } from "../Rooms/Rooms.js"; 
import { Status } from "../Enumerations/Status.js";

//Room service conatins all operations relevant to the room domain
export class RoomService {
  constructor(private readonly repo: RoomRepositoryStrategy) {}

	AddRoom(Room: Room): string {
		if (this.FindRoom(Room.RoomID) !== null){
			return "Room cannot be added";
		}

		this.repo.save(Room);

		return "Room added";
	}

	RemoveRoom(RoomID: number): string {
		this.repo.delete(RoomID);

		return "Room removed";
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

	UpdateStatus(RoomID: number, NewStatus: Status): string{
		this.repo.updateStatus(RoomID, NewStatus);

		return "Room status updated";
	}

	RemoveAllRooms(): string{
		this.repo.deleteAll();

		return "All rooms removed";
	}

}