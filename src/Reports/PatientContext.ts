import { PatientService } from "../Services/PatientService.js";

//Returns a reference to patient service
export class PatientContext {
  constructor(
    public readonly patientService: PatientService,
  ) {}
}
