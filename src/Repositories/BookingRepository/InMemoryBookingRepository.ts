import type { BookingRepositoryStrategy } from "./BookingRepositoryStrategy.js";
import { Booking } from "../../Bookings/Booking.js"; 
import { Status } from "../../Enumerations/Status.js";

export class InMemoryBookingRepository implements BookingRepositoryStrategy {
  private readonly Bookings = new Map<number, Booking>();

  readByBookingID(BookingID: number): Booking | null {
    return this.Bookings.get(BookingID) ?? null;
  }

  readByRoomID(RoomID: number): Booking | null {
    var All = [...this.Bookings.values()];
    var Booking = All.find(b => b.RoomID === RoomID);

    return Booking ?? null;
  }

  readByPatientID(PatientID: number): Booking | null {
    var All = [...this.Bookings.values()];
    var Booking = All.find(b => b.PatientID === PatientID);

    return Booking ?? null;
  }

  save(Booking: Booking): void {
    this.Bookings.set(Booking.PatientID, Booking);
  }

  all(): Booking[] {
    return [...this.Bookings.values()];
  }

  delete(BookingID: number): void {
    this.Bookings.delete(BookingID);
  }

  deleteAll(): void {
    this.Bookings.clear();
  }

  updateStatus(BookingID: number, Status: Status): void {

  }

}