import type { PatientRepositoryStrategy } from "../Repositories/PatientRepository/PatientRepositoryStrategy.js";
import { Patient } from "../Patients/Patient.js";
export declare class PatientService {
    private readonly repo;
    constructor(repo: PatientRepositoryStrategy);
    RegisterPatient(Patient: Patient): void;
    FindPatient(PatientID: number): Patient | null;
    RemovePatient(PatientID: number): void;
    All(): Patient[];
    RemoveAllPatients(): void;
}
//# sourceMappingURL=PatientService.d.ts.map