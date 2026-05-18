import { Booking } from "../../Bookings/Booking.js";
import { Status } from "../../Enumerations/Status.js";

// StudentRepository.ts
export interface BookingRepositoryStrategy {
  save(Booking: Booking): void;
  readByBookingID(BookingID: number): Booking | null;
  readByRoomID(RoomID: number): Booking | null;
  readByPatientID(PatientID: number): Booking | null;
  all(): Booking[];
  delete(BookingID: number): void;
  deleteAll(): void;
  updateStatus(BookingID: number, Status: Status): void;
}