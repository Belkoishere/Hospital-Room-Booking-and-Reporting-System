import { Room } from "./Rooms.js";
import { ICUBay } from "./Rooms.js";
import { IsolationRoom } from "./Rooms.js";
import { PrivateRoom } from "./Rooms.js";
import { WardBay } from "./Rooms.js";
import type { RoomConfig } from "./RoomConfig.js";

// Factory for creating different room types
export class RoomSimpleFactory {
    //Rooms are passed in as a the RoomConfig parameter object to avoid writing out many attributes
    static AddRoom(type: string, RoomConfig: RoomConfig): Room {
    //could improve by using a map over switch/case
        switch (type.toLowerCase()) {
            case "icubay":
                return new ICUBay(RoomConfig);
            case "isolationroom":
                return new IsolationRoom(RoomConfig);
            case "privateroom":
                return new PrivateRoom(RoomConfig);
            case "wardbay":
                return new WardBay(RoomConfig);
            default:
                throw new Error(`Unknown room type: ${type}`);
        }
    }
}