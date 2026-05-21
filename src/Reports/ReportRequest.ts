//Report request contains report type for the report simple factory and paramerters to be passed into the reports
export class ReportRequest {
  constructor(
    private reportType: string,
    private reportParameters: Map<string, any>
  ) {}

  GetReportType(): string {
    return this.reportType;
  }

  GetReportParameters(): Map<string, any> {
    return this.reportParameters;
  }
}
