import { Equipment } from "../Enumerations/Equipment.js";
import { Status } from "../Enumerations/Status.js";
import type { RoomConfig } from "./RoomConfig.js";
export declare abstract class Room {
    RoomID: number;
    EquipmentList: Equipment[];
    DailyCost: number;
    Status: Status;
    constructor(RoomConfig: RoomConfig);
    abstract GetType(): string;
}
export declare class ICUBay extends Room {
    GetType(): string;
}
export declare class IsolationRoom extends Room {
    GetType(): string;
}
export declare class PrivateRoom extends Room {
    GetType(): string;
}
export declare class WardBay extends Room {
    GetType(): string;
}
//# sourceMappingURL=Rooms.d.ts.map