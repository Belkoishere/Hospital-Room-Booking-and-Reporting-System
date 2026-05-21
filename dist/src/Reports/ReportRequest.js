//Report request contains report type for the report simple factory and paramerters to be passed into the reports
export class ReportRequest {
    constructor(reportType, reportParameters) {
        this.reportType = reportType;
        this.reportParameters = reportParameters;
    }
    GetReportType() {
        return this.reportType;
    }
    GetReportParameters() {
        return this.reportParameters;
    }
}
//# sourceMappingURL=ReportRequest.js.map