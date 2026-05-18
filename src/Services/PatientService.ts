import type { PatientRepositoryStrategy } from "../Repositories/PatientRepository/PatientRepositoryStrategy.js"; 
import { Patient } from "../Patients/Patient.js"; 

export class PatientService {
  constructor(private readonly repo: PatientRepositoryStrategy) {}

  RegisterPatient(Patient: Patient): void {
    this.repo.save(Patient);
  }

  FindPatient(PatientID: number): Patient | null {
    return this.repo.read(PatientID)
  }

  RemovePatient(PatientID: number): void {
    return this.repo.delete(PatientID);
  }

  All(): Patient[]{
    return this.repo.all();
  }

  RemoveAllPatients(): void{
		this.repo.deleteAll();
	}

}