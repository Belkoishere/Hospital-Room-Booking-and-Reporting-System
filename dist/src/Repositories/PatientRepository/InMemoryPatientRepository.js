import { Patient } from "../../Patients/Patient.js";
export class InMemoryPatientRepository {
    constructor() {
        this.Patients = new Map();
    }
    read(PatientID) {
        return this.Patients.get(PatientID) ?? null;
    }
    save(Patient) {
        this.Patients.set(Patient.PatientID, Patient);
    }
    all() {
        return [...this.Patients.values()];
    }
    delete(PatientID) {
        this.Patients.delete(PatientID);
    }
    deleteAll() {
        this.Patients.clear();
    }
    update() {
    }
}
//# sourceMappingURL=InMemoryPatientRepository.js.map