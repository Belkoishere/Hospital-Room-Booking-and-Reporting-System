import { Patient } from "../Patients/Patient.js";
export class PatientService {
    constructor(repo) {
        this.repo = repo;
    }
    RegisterPatient(Patient) {
        this.repo.save(Patient);
        return "Patient registered";
    }
    FindPatient(PatientID) {
        return this.repo.read(PatientID);
    }
    RemovePatient(PatientID) {
        this.repo.delete(PatientID);
        return "Patient" + PatientID.toString() + " removed";
    }
    AllPatients() {
        return this.repo.all();
    }
    RemoveAllPatients() {
        this.repo.deleteAll();
        return "All patients removed";
    }
}
//# sourceMappingURL=PatientService.js.map