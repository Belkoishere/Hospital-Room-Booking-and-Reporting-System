import { Report } from "./Report.js";
import { PatientService } from "../Services/PatientService.js";
export declare class PatientNumbersReport extends Report {
    private readonly pservice;
    constructor(pservice: PatientService);
    protected run(params: Map<string, any>): number | null;
}
//# sourceMappingURL=PatientNumbersReport.d.ts.map