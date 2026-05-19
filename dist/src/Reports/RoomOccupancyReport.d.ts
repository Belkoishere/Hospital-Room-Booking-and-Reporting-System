import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
export declare class RoomOccupancyReport extends Report {
    private readonly rservice;
    constructor(rservice: RoomService);
    protected run(params: Map<string, any>): number | null;
}
//# sourceMappingURL=RoomOccupancyReport.d.ts.map