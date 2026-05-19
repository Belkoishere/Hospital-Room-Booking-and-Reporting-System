import {ReportRequest} from "./ReportRequest.js";

export abstract class Report {
  // Template Method
  GenerateReport(request: ReportRequest): any {
    const params = request.GetReportParameters();
    return this.run(params);
  }

  // Primitive operation to be implemented by subclasses
  protected abstract run(params: Map<string, any>): any;
}
