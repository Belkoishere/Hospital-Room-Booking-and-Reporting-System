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
        this.Bookings.set(Booking.BookingID, Booking);
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
    updateEndDate(BookingID, EndDate) {
        let Booking = this.readByBookingID(BookingID);
        if (!Booking) {
            return null;
        }
        else {
            let NewBooking = Booking;
            NewBooking.EndDate = EndDate;
            this.Bookings.set(BookingID, NewBooking);
        }
    }
    uniqueID() {
        let LastID = [...this.Bookings.keys()].pop();
        if (!LastID) {
            return 1;
        }
        return LastID + 1;
    }
}
//# sourceMappingURL=InMemoryBookingRepository.js.map