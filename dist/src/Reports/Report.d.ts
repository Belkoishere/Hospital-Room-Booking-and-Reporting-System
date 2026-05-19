import { ReportRequest } from "./ReportRequest.js";
export declare abstract class Report {
    GenerateReport(request: ReportRequest): any;
    protected abstract run(params: Map<string, any>): any;
}
//# sourceMappingURL=Report.d.ts.map