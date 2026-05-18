import type { BookingRepositoryStrategy } from "./BookingRepositoryStrategy.js";
import { Booking } from "../../Bookings/Booking.js";
import { Status } from "../../Enumerations/Status.js";
export declare class InMemoryBookingRepository implements BookingRepositoryStrategy {
    private readonly Bookings;
    readByBookingID(BookingID: number): Booking | null;
    readByRoomID(RoomID: number): Booking | null;
    readByPatientID(PatientID: number): Booking | null;
    save(Booking: Booking): void;
    all(): Booking[];
    delete(BookingID: number): void;
    deleteAll(): void;
    updateStatus(BookingID: number, Status: Status): void;
}
//# sourceMappingURL=InMemoryBookingRepository.d.ts.map