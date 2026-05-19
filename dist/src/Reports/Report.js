import { ReportRequest } from "./ReportRequest.js";
export class Report {
    // Template Method
    GenerateReport(request) {
        const params = request.GetReportParameters();
        return this.run(params);
    }
}
//# sourceMappingURL=Report.js.map