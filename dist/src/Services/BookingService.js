import { Booking } from "../Bookings/Booking.js";
import { Status } from "../Enumerations/Status.js";
//Booking service conatins all operations relevant to the booking domain and makes use of patient and room service for certain operations
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
        //Perform validation checks before booking room to prevent instances such as
        //double bookings
        //booking of unavailable rooms
        //booking of unsuitable rooms
        if (this.rservice.FindRoom(roomID) === null ||
            this.pservice.FindPatient(patientID) === null ||
            this.rservice.IsAvailable(roomID) === false ||
            this.FindByBookingID(bookingID) !== null ||
            this.ActiveBookingByPatientID(patientID) !== null ||
            this.ActiveBookingByRoomID(roomID) !== null ||
            this.IsSuitable(roomID, patientID) === false) {
            return "Can't book room";
        }
        this.bookingRepo.save(booking);
        this.rservice.UpdateStatus(bookingID, Status["Occupied"]);
        return "Room booked successfully";
    }
    ActiveBookingByPatientID(patientID) {
        const booking = this.FindByPatientID(patientID);
        if (!booking) {
            return null;
        }
        else if (booking.EndDate === null) {
            return booking;
        }
        return null;
    }
    ActiveBookingByRoomID(roomID) {
        const booking = this.FindByRoomID(roomID);
        if (!booking) {
            return null;
        }
        else if (booking.EndDate === null) {
            return booking;
        }
        return null;
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
        const currentBooking = this.ActiveBookingByPatientID(patientID);
        if (!currentBooking) {
            return "Patient does not have an active booking";
        }
        else if (currentBooking.RoomID === roomID) {
            return "Patient is already booked into this room";
        }
        this.EndBooking(currentBooking.BookingID);
        this.rservice.UpdateStatus(currentBooking.BookingID, Status["Available"]);
        const newBooking = new Booking(this.bookingRepo.uniqueID(), patientID, roomID, new Date(), null);
        this.BookRoom(newBooking);
    }
}
//# sourceMappingURL=BookingService.js.map