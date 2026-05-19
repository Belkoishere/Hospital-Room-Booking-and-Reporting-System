import { Room } from "./Rooms.js";
import { ICUBay } from "./Rooms.js";
import { IsolationRoom } from "./Rooms.js";
import { PrivateRoom } from "./Rooms.js";
import { WardBay } from "./Rooms.js";
// Factory for creating shape based objects, e.g. square, circle
export class RoomSimpleFactory {
    static AddRoom(type, RoomConfig) {
        // nb: could improve by using a map over switch/case
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
//# sourceMappingURL=RoomSimpleFactory.js.map