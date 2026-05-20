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

  BookRoom(booking: Booking): void | string {
    const bookingID = booking.BookingID;
    const roomID = booking.RoomID;
    const patientID = booking.PatientID;

	  //Perform validation checks before booking room to prevent instances such as
    //double bookings
    //booking of unavailable rooms
    //booking of unsuitable rooms

    if (
      this.rservice.FindRoom(roomID) === null ||
      this.pservice.FindPatient(patientID) === null ||
      this.rservice.IsAvailable(roomID) === false ||
      this.FindByBookingID(bookingID) !== null ||
      //Check if patient already has an active booking
      this.ActiveBookingByPatientID(patientID) !== null ||
      this.ActiveBookingByRoomID(roomID) !== null ||
      this.IsSuitable(roomID, patientID) === false
    ) {
      return "Can't book room";
    }

    this.bookingRepo.save(booking);
    
  }

  ActiveBookingByPatientID(patientID: number): Booking | null {
    const booking = this.FindByPatientID(patientID);

    if (!booking) {
      return null;
    }
    else if (booking.EndDate === null){
      return booking;
    }

    return null;
    
  }

  ActiveBookingByRoomID(roomID: number): Booking | null {
    const booking = this.FindByRoomID(roomID);

    if (!booking) {
      return null;
    }
    else if (booking.EndDate === null){
      return booking;
    }

    return null;
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

  MovePatient(patientID: number, roomID: number): void | string {
    const currentBooking = this.ActiveBookingByPatientID(patientID);

    if (!currentBooking) {
      return "Patient does not have an active booking";
    }
    else if (currentBooking.RoomID === roomID){
      return "Patient is already booked into this room";
    }

    this.EndBooking(currentBooking.BookingID);

    const newBooking = new Booking(
      this.bookingRepo.uniqueID(),
      patientID,
      roomID,
      new Date(),
      null
    );

    this.BookRoom(newBooking);

  }
}