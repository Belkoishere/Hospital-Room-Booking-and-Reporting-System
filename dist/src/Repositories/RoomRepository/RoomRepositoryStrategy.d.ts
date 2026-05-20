import { Room } from "../../Rooms/Rooms.js";
import { Status } from "../../Enumerations/Status.js";
export interface RoomRepositoryStrategy {
    save(Room: Room): void;
    read(RoomID: number): Room | null;
    all(): Room[];
    delete(RoomID: number): void;
    deleteAll(): void;
    updateStatus(RoomID: number, NewStatus: Status): void;
}
//# sourceMappingURL=RoomRepositoryStrategy.d.ts.map