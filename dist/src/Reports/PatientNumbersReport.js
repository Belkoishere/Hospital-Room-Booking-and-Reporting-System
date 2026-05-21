import { Report } from "./Report.js";
import { PatientService } from "../Services/PatientService.js";
export class PatientNumbersReport extends Report {
    constructor(pservice) {
        super();
        this.pservice = pservice;
    }
    run(params) {
        const type = params.get("Type");
        const all = this.pservice.AllPatients();
        switch (type) {
            case "All":
                return all.length;
            case "Discharged":
                return all.filter(p => p.DischargeDate !== null).length;
            //Return number of patients that have not been dischraged yet
            case "Current":
                return all.filter(p => p.DischargeDate === null).length;
            default:
                return null;
        }
    }
}
//# sourceMappingURL=PatientNumbersReport.js.map