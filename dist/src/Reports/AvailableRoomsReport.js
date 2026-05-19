import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";
export class AvailableRoomsReport extends Report {
    constructor(rservice) {
        super();
        this.rservice = rservice;
    }
    run(params) {
        const type = params.get("Type");
        const all = this.rservice.AllRooms();
        if (type === "All") {
            return all.filter(r => r.Status === Status["Available"]);
        }
        return all.filter(r => r.GetType() === type && r.Status === Status["Available"]);
    }
}
//# sourceMappingURL=AvailableRoomsReport.js.map