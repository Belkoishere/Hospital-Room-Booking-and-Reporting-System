import type { PatientRepositoryStrategy } from "../Repositories/PatientRepository/PatientRepositoryStrategy.js";
import { Patient } from "../Patients/Patient.js";
export declare class PatientService {
    private readonly repo;
    constructor(repo: PatientRepositoryStrategy);
    RegisterPatient(Patient: Patient): string;
    FindPatient(PatientID: number): Patient | null;
    RemovePatient(PatientID: number): string;
    AllPatients(): Patient[];
    RemoveAllPatients(): string;
}
//# sourceMappingURL=PatientService.d.ts.map