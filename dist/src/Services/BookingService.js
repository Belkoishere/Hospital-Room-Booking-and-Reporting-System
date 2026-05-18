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
        if (this.rservice.FindRoom(roomID) === null ||
            this.pservice.FindPatient(patientID) === null ||
            this.rservice.IsAvailable(roomID) === false ||
            this.FindByBookingID(bookingID) !== null ||
            this.FindByPatientID(patientID) !== null ||
            this.FindByRoomID(roomID) !== null ||
            this.IsSuitable(roomID, patientID) === false) {
            return null;
        }
        this.bookingRepo.save(booking);
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
    CancelBooking(bookingID) {
        // implement if needed
    }
    EndBooking(bookingID) {
        // implement if needed
    }
    MovePatient(patientID, roomID) {
        // implement if needed
    }
}
//# sourceMappingURL=BookingService.js.map