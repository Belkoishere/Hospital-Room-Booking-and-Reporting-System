import { Patient } from "../Patients/Patient.js";
export class PatientService {
    constructor(repo) {
        this.repo = repo;
    }
    RegisterPatient(Patient) {
        this.repo.save(Patient);
    }
    FindPatient(PatientID) {
        return this.repo.read(PatientID);
    }
    RemovePatient(PatientID) {
        this.repo.delete(PatientID);
    }
    All() {
        return this.repo.all();
    }
    RemoveAllPatients() {
        this.repo.deleteAll();
    }
}
//# sourceMappingURL=PatientService.js.map