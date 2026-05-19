import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";

export class AverageStayReport extends Report {
  constructor(private readonly bservice: BookingService) {
    super();
  }

  protected run(params: Map<string, any>): number | null {
    const type = params.get("Type");
    const all = this.bservice.All();

    return 45;
  }
}
