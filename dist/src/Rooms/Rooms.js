import { Equipment } from "../Enumerations/Equipment.js";
import { Status } from "../Enumerations/Status.js";
export class Room {
    constructor(RoomConfig) {
        Object.assign(this, RoomConfig);
    }
}
// Circle class derived from Shape base class
export class ICUBay extends Room {
    GetType() {
        return "ICUBay";
    }
}
// Square class derived from Shape base class
export class IsolationRoom extends Room {
    GetType() {
        return "IsolationRoom";
    }
}
export class PrivateRoom extends Room {
    GetType() {
        return "PrivateRoom";
    }
}
export class WardBay extends Room {
    GetType() {
        return "WardBay";
    }
}
//# sourceMappingURL=Rooms.js.map