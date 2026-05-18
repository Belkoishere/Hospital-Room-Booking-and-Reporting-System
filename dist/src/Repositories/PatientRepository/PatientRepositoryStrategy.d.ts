import { Patient } from "../../Patients/Patient.js";
export interface PatientRepositoryStrategy {
    save(Patient: Patient): void;
    read(PatientID: number): Patient | null;
    all(): Patient[];
    delete(PatientID: number): void;
    deleteAll(): void;
    update(): void;
}
//# sourceMappingURL=PatientRepositoryStrategy.d.ts.map