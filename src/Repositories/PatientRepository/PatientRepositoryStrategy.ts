import { Patient } from "../../Patients/Patient.js";

// StudentRepository.ts
export interface PatientRepositoryStrategy {
  save(Patient: Patient): void;
  read(PatientID: number): Patient | null;
  all(): Patient[];
  delete(PatientID: number): void;
  deleteAll(): void;
  update(): void;
}