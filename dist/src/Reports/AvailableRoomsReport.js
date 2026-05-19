import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
export class AvailableRoomsReport extends Report {
    constructor(rservice) {
        super();
        this.rservice = rservice;
    }
    run(params) {
        const type = params.get("Type");
        return 45;
    }
}
//# sourceMappingURL=AvailableRoomsReport.js.map