import { Booking } from "../Bookings/Booking.js";
export class BookingService {
    constructor(bookingRepo, pservice, rservice) {
        this.bookingRepo = bookingRepo;
        this.pservice = pservice;
        this.rservice = rservice;
    }
    BookRoom(booking) {
        const bookingID = booking.BookingID;
        const roomID = booking.RoomID;
        const patientID = booking.PatientID;
        //Check if booking is valid before booking room
        if (this.rservice.FindRoom(roomID) === null ||
            this.pservice.FindPatient(patientID) === null ||
            this.rservice.IsAvailable(roomID) === false ||
            this.FindByBookingID(bookingID) !== null ||
            //Check if patient already has an active booking
            this.ActiveBookingByPatientID(patientID) === true ||
            this.ActiveBookingByRoomID(roomID) === true ||
            this.IsSuitable(roomID, patientID) === false) {
            return null;
        }
        this.bookingRepo.save(booking);
    }
    ActiveBookingByPatientID(patientID) {
        const booking = this.FindByPatientID(patientID);
        if (!booking) {
            return false;
        }
        return booking.EndDate === null;
    }
    ActiveBookingByRoomID(roomID) {
        const booking = this.FindByRoomID(roomID);
        if (!booking) {
            return false;
        }
        return booking.EndDate !== null;
    }
    FindByBookingID(bookingID) {
        return this.bookingRepo.readByBookingID(bookingID);
    }
    FindByPatientID(patientID) {
        return this.bookingRepo.readByPatientID(patientID);
    }
    FindByRoomID(roomID) {
        return this.bookingRepo.readByRoomID(roomID);
    }
    All() {
        return this.bookingRepo.all();
    }
    IsSuitable(roomID, patientID) {
        const clinicalRequirements = this.pservice.FindPatient(patientID)?.ClinicalRequirements;
        const equipmentList = this.rservice.FindRoom(roomID)?.EquipmentList;
        if (!clinicalRequirements || !equipmentList) {
            return false;
        }
        return clinicalRequirements.every((equipment) => equipmentList.includes(equipment));
    }
    RemoveAllBookings() {
        this.bookingRepo.deleteAll();
    }
    RemoveBooking(BookingID) {
        this.bookingRepo.delete(BookingID);
    }
    CancelBooking(bookingID) {
    }
    EndBooking(bookingID) {
        this.bookingRepo.updateEndDate(bookingID, new Date());
    }
    MovePatient(patientID, roomID) {
        const currentBooking = this.FindByPatientID(patientID);
        if (!currentBooking) {
            return null;
        }
        this.EndBooking(currentBooking.BookingID);
        const newBooking = new Booking(this.bookingRepo.uniqueID(), patientID, roomID, new Date(), null);
        return this.BookRoom(newBooking);
    }
}
//# sourceMappingURL=BookingService.js.map