import type { RoomRepositoryStrategy } from "./RoomRepositoryStrategy.js";
import { Room } from "../../Rooms/Rooms.js";
import type { Status } from "../../Enumerations/Status.js";
export declare class InMemoryRoomRepository implements RoomRepositoryStrategy {
    private readonly Rooms;
    read(RoomID: number): Room | null;
    save(Room: Room): void;
    all(): Room[];
    delete(RoomID: number): void;
    deleteAll(): void;
    updateStatus(RoomID: number, NewStatus: Status): void | string;
}
//# sourceMappingURL=InMemoryRoomRepository.d.ts.map