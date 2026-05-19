import { PatientService } from "../Services/PatientService.js";

export class PatientContext {
  constructor(
    public readonly patientService: PatientService,
  ) {}
}
