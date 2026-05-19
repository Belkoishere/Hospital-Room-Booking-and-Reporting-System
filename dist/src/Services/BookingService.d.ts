import type { BookingRepositoryStrategy } from "../Repositories/BookingRepository/BookingRepositoryStrategy.js";
import type { PatientService } from "./PatientService.js";
import type { RoomService } from "./RoomService.js";
import { Booking } from "../Bookings/Booking.js";
export declare class BookingService {
    private readonly bookingRepo;
    private readonly pservice;
    private readonly rservice;
    constructor(bookingRepo: BookingRepositoryStrategy, pservice: PatientService, rservice: RoomService);
    BookRoom(booking: Booking): void | null;
    ActiveBookingByPatientID(patientID: number): boolean;
    ActiveBookingByRoomID(roomID: number): boolean;
    FindByBookingID(bookingID: number): Booking | null;
    FindByPatientID(patientID: number): Booking | null;
    FindByRoomID(roomID: number): Booking | null;
    All(): Booking[];
    IsSuitable(roomID: number, patientID: number): boolean;
    RemoveAllBookings(): void;
    RemoveBooking(BookingID: number): void;
    CancelBooking(bookingID: number): void;
    EndBooking(bookingID: number): void;
    MovePatient(patientID: number, roomID: number): void | null;
}
//# sourceMappingURL=BookingService.d.ts.map