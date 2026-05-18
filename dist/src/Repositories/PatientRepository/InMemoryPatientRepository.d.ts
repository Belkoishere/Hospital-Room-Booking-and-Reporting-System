import type { PatientRepositoryStrategy } from "./PatientRepositoryStrategy.js";
import { Patient } from "../../Patients/Patient.js";
export declare class InMemoryPatientRepository implements PatientRepositoryStrategy {
    private readonly Patients;
    read(PatientID: number): Patient | null;
    save(Patient: Patient): void;
    all(): Patient[];
    delete(PatientID: number): void;
    deleteAll(): void;
    update(): void;
}
//# sourceMappingURL=InMemoryPatientRepository.d.ts.map