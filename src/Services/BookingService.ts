import type { BookingRepositoryStrategy } from "../Repositories/BookingRepository/BookingRepositoryStrategy.js";
import type { PatientService } from "./PatientService.js";
import type { RoomService } from "./RoomService.js";
import { Booking } from "../Bookings/Booking.js";

export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepositoryStrategy,
    private readonly pservice: PatientService,
    private readonly rservice: RoomService
  ) {}

  BookRoom(booking: Booking): void | null {
    const bookingID = booking.BookingID;
    const roomID = booking.RoomID;
    const patientID = booking.PatientID;

    if (
      this.rservice.FindRoom(roomID) === null ||
      this.pservice.FindPatient(patientID) === null ||
      this.rservice.IsAvailable(roomID) === false ||
      this.FindByBookingID(bookingID) !== null ||
      this.FindByPatientID(patientID) !== null ||
      this.FindByRoomID(roomID) !== null ||
      this.IsSuitable(roomID, patientID) === false
    ) {
      return null;
    }

    this.bookingRepo.save(booking);
  }

  FindByBookingID(bookingID: number): Booking | null {
    return this.bookingRepo.readByBookingID(bookingID);
  }

  FindByPatientID(patientID: number): Booking | null {
    return this.bookingRepo.readByPatientID(patientID);
  }

  FindByRoomID(roomID: number): Booking | null {
    return this.bookingRepo.readByRoomID(roomID);
  }

  All(): Booking[] {
    return this.bookingRepo.all();
  }

  IsSuitable(roomID: number, patientID: number): boolean {
    const clinicalRequirements =
      this.pservice.FindPatient(patientID)?.ClinicalRequirements;

    const equipmentList =
      this.rservice.FindRoom(roomID)?.EquipmentList;

    if (!clinicalRequirements || !equipmentList) {
      return false;
    }

    return clinicalRequirements.every((equipment) =>
      equipmentList.includes(equipment)
    );
  }

  RemoveAllBookings(): void {
    this.bookingRepo.deleteAll();
  }

  CancelBooking(bookingID: number): void {
    // implement if needed
  }

  EndBooking(bookingID: number): void {
    // implement if needed
  }

  MovePatient(patientID: number, roomID: number): void {
    // implement if needed
  }
}