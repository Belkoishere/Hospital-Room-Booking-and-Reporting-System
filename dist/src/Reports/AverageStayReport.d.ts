import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";
import { RoomService } from "../Services/RoomService.js";
export declare class AverageStayReport extends Report {
    private readonly bservice;
    private readonly rservice;
    constructor(bservice: BookingService, rservice: RoomService);
    protected run(params: Map<string, any>): number | null;
    dateDiffInDays(a: Date | null, b: Date): number | null;
}
//# sourceMappingURL=AverageStayReport.d.ts.map