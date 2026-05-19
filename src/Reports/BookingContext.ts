import { BookingService } from "../Services/BookingService.js";

export class PatientContext {
  constructor(
    public readonly patientService: BookingService,
  ) {}
}
