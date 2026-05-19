import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";
export declare class AverageStayReport extends Report {
    private readonly bservice;
    constructor(bservice: BookingService);
    protected run(params: Map<string, any>): number | null;
}
//# sourceMappingURL=AverageStayReport.d.ts.map