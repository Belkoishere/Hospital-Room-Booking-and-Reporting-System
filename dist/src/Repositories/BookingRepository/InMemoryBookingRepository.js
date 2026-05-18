import { Booking } from "../../Bookings/Booking.js";
import { Status } from "../../Enumerations/Status.js";
export class InMemoryBookingRepository {
    constructor() {
        this.Bookings = new Map();
    }
    readByBookingID(BookingID) {
        return this.Bookings.get(BookingID) ?? null;
    }
    readByRoomID(RoomID) {
        var All = [...this.Bookings.values()];
        var Booking = All.find(b => b.RoomID === RoomID);
        return Booking ?? null;
    }
    readByPatientID(PatientID) {
        var All = [...this.Bookings.values()];
        var Booking = All.find(b => b.PatientID === PatientID);
        return Booking ?? null;
    }
    save(Booking) {
        this.Bookings.set(Booking.PatientID, Booking);
    }
    all() {
        return [...this.Bookings.values()];
    }
    delete(BookingID) {
        this.Bookings.delete(BookingID);
    }
    deleteAll() {
        this.Bookings.clear();
    }
    updateStatus(BookingID, Status) {
    }
}
//# sourceMappingURL=InMemoryBookingRepository.js.map