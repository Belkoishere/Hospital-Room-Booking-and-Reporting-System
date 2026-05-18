import { Room } from "../../Rooms/Rooms.js";
export interface RoomRepositoryStrategy {
    save(Room: Room): void;
    read(RoomID: number): Room | null;
    all(): Room[];
    delete(RoomID: number): void;
    deleteAll(): void;
    update(): void;
}
//# sourceMappingURL=RoomRepositoryStrategy.d.ts.map