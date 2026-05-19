import { RoomService } from "../Services/RoomService.js";

export class PatientContext {
  constructor(
    public readonly patientService: RoomService,
  ) {}
}
