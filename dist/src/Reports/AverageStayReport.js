import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";
export class AverageStayReport extends Report {
    constructor(bservice) {
        super();
        this.bservice = bservice;
    }
    run(params) {
        const type = params.get("Type");
        const all = this.bservice.All();
        return 45;
    }
}
//# sourceMappingURL=AverageStayReport.js.map