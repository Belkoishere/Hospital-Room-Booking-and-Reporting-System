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

	  //Perform sanity checks before booking room to prevent instances such as
    //double bookings
    //booking of unavailable rooms
    //booking of unsuitable rooms

    if (
      this.rservice.FindRoom(roomID) === null ||
      this.pservice.FindPatient(patientID) === null ||
      this.rservice.IsAvailable(roomID) === false ||
      this.FindByBookingID(bookingID) !== null ||
      //Check if patient already has an active booking
      this.ActiveBookingByPatientID(patientID) === true ||
      this.ActiveBookingByRoomID(roomID) === true ||
      this.IsSuitable(roomID, patientID) === false
    ) {
      return null;
    }

    this.bookingRepo.save(booking);
  }

  ActiveBookingByPatientID(patientID: number): boolean {
    const booking = this.FindByPatientID(patientID);

    if (!booking) {
      return false;
    }

    return booking.EndDate === null;
  }

  ActiveBookingByRoomID(roomID: number): boolean {
    const booking = this.FindByRoomID(roomID);

    if (!booking) {
      return false;
    }

    return booking.EndDate !== null;
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

  RemoveBooking(BookingID: number): void {
	this.bookingRepo.delete(BookingID)
  }

  CancelBooking(bookingID: number): void {
    
  }

  EndBooking(bookingID: number): void {
    this.bookingRepo.updateEndDate(bookingID, new Date());
  }

  MovePatient(patientID: number, roomID: number): void | null {
    const currentBooking = this.FindByPatientID(patientID);

    if (!currentBooking) {
      return null;
    }

    this.EndBooking(currentBooking.BookingID);

    const newBooking = new Booking(
      this.bookingRepo.uniqueID(),
      patientID,
      roomID,
      new Date(),
      null
    );

    return this.BookRoom(newBooking);
  }
}