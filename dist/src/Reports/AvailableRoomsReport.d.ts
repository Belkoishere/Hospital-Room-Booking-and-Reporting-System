import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
import { Room } from "../Rooms/Rooms.js";
export declare class AvailableRoomsReport extends Report {
    private readonly rservice;
    constructor(rservice: RoomService);
    protected run(params: Map<string, any>): Room[] | string;
}
//# sourceMappingURL=AvailableRoomsReport.d.ts.map