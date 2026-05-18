import type { RoomRepositoryStrategy } from "./RoomRepositoryStrategy.js";
import { Room } from "../../Rooms/Rooms.js";
export declare class InMemoryRoomRepository implements RoomRepositoryStrategy {
    private readonly Rooms;
    read(RoomID: number): Room | null;
    save(Room: Room): void;
    all(): Room[];
    delete(RoomID: number): void;
    deleteAll(): void;
    update(): void;
}
//# sourceMappingURL=InMemoryRoomRepository.d.ts.map