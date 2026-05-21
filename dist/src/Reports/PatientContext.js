import { PatientService } from "../Services/PatientService.js";
//Returns a reference to patient service
export class PatientContext {
    constructor(patientService) {
        this.patientService = patientService;
    }
}
//# sourceMappingURL=PatientContext.js.map