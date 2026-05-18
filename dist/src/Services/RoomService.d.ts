import type { RoomRepositoryStrategy } from "../Repositories/RoomRepository/RoomRepositoryStrategy.js";
import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
export declare class RoomService {
    private readonly repo;
    constructor(repo: RoomRepositoryStrategy);
    AddRoom(Room: Room): void;
    RemoveRoom(RoomID: number): void;
    FindRoom(RoomID: number): Room | null;
    IsAvailable(RoomID: number): Boolean;
    AllRooms(): Room[];
    UpdateStatus(RoomID: number, Status: Status): void;
    RemoveAllRooms(): void;
}
//# sourceMappingURL=RoomService.d.ts.map