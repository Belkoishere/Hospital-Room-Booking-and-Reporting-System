import type { PatientRepositoryStrategy } from "../Repositories/PatientRepository/PatientRepositoryStrategy.js"; 
import { Patient } from "../Patients/Patient.js"; 

//Patient service conatins all operations relevant to the patient domain
export class PatientService {
  // Repository to be used is passed in making  it easy to change which repository is used
  constructor(private readonly repo: PatientRepositoryStrategy) {}

  RegisterPatient(Patient: Patient): string {
    this.repo.save(Patient);

    return "Patient registered";
  }

  FindPatient(PatientID: number): Patient | null {
    return this.repo.read(PatientID)
  }

  RemovePatient(PatientID: number): string {
    this.repo.delete(PatientID);

    return "Patient" + PatientID.toString() + " removed";
  }

  AllPatients(): Patient[]{
    return this.repo.all();
  }

  RemoveAllPatients(): string{
		this.repo.deleteAll();

    return "All patients removed";
	}

}