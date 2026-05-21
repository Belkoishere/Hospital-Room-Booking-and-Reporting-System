import { Patient } from "../../Patients/Patient.js";

// Defines methods for all patient storage methods to implement
export interface PatientRepositoryStrategy {
  save(Patient: Patient): void;
  read(PatientID: number): Patient | null;
  all(): Patient[];
  delete(PatientID: number): void;
  deleteAll(): void;
  update(): void;
}