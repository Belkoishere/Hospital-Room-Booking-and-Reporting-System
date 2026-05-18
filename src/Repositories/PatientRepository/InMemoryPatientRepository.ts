import type { PatientRepositoryStrategy } from "./PatientRepositoryStrategy.js";
import { Patient } from "../../Patients/Patient.js";

export class InMemoryPatientRepository implements PatientRepositoryStrategy {
  private readonly Patients = new Map<number, Patient>();

  read(PatientID: number): Patient | null {
    return this.Patients.get(PatientID) ?? null;
  }

  save(Patient: Patient): void{
    this.Patients.set(Patient.PatientID, Patient);
  }

  all(): Patient[] {
    return [...this.Patients.values()];
  }

  delete(PatientID: number): void {
    this.Patients.delete(PatientID);
  }

  deleteAll(): void {
    this.Patients.clear();
  }

  update(): void {

  }

}