import type { RoomRepositoryStrategy } from "../Repositories/RoomRepository/RoomRepositoryStrategy.js"; 
import { Room } from "../Rooms/Rooms.js"; 
import { Status } from "../Enumerations/Status.js";

export class RoomService {
  constructor(private readonly repo: RoomRepositoryStrategy) {}

	AddRoom(Room: Room): void {
		this.repo.save(Room);
	}

	RemoveRoom(RoomID: number): void {
		this.repo.delete(RoomID)
	}

	FindRoom(RoomID: number): Room | null {
		return this.repo.read(RoomID);
	}

	IsAvailable(RoomID: number): Boolean{
		if(this.FindRoom(RoomID)?.Status == Status["Available"]){
			return true;
		}
		else {
			return false;
		}
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