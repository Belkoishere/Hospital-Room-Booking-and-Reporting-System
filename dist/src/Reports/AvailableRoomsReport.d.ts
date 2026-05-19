import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
export declare class AvailableRoomsReport extends Report {
    private readonly rservice;
    constructor(rservice: RoomService);
    protected run(params: Map<string, any>): number | null;
}
//# sourceMappingURL=AvailableRoomsReport.d.ts.map