import type { RoomRepositoryStrategy } from "../Repositories/RoomRepository/RoomRepositoryStrategy.js";
import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
export declare class RoomService {
    private readonly repo;
    constructor(repo: RoomRepositoryStrategy);
    AddRoom(Room: Room): string;
    RemoveRoom(RoomID: number): string;
    FindRoom(RoomID: number): Room | null;
    IsAvailable(RoomID: number): Boolean | string;
    AllRooms(): Room[];
    UpdateStatus(RoomID: number, NewStatus: Status): string;
    RemoveAllRooms(): string;
}
//# sourceMappingURL=RoomService.d.ts.map