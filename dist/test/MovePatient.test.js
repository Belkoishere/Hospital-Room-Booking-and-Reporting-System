import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { Status } from "../src/Enumerations/Status.js";
import { InMemoryBookingRepository } from "../src/Repositories/BookingRepository/InMemoryBookingRepository.js";
import { BookingService } from "../src/Services/BookingService.js";
import { Booking } from "../src/Bookings/Booking.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";
test("Move patient", () => {
    const brepo = new InMemoryBookingRepository();
    const prepo = new InMemoryPatientRepository();
    const rrepo = new InMemoryRoomRepository();
    const pservice = new PatientService(prepo);
    const rservice = new RoomService(rrepo);
    const bservice = new BookingService(brepo, pservice, rservice);
    const room1 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 1,
        EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"], Equipment["IVPole"]],
        DailyCost: 23,
        Status: Status["Available"] });
    const room2 = RoomSimpleFactory.AddRoom("IsolationRoom", { RoomID: 2,
        EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"]],
        DailyCost: 14,
        Status: Status["Available"] });
    const patient = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("17/05/2026"), null, 23, [Equipment["Bed"], Equipment["Defibrilator"]]);
    const booking = new Booking(1, 1, 1, new Date(), null);
    pservice.RegisterPatient(patient);
    rservice.AddRoom(room1);
    rservice.AddRoom(room2);
    bservice.BookRoom(booking);
    //Move patient 1 into room 2
    bservice.MovePatient(1, 2);
    //A new booking is created with the new room
    assert.strictEqual(bservice.FindByBookingID(2)?.RoomID, 2);
    assert.strictEqual(bservice.FindByBookingID(1)?.RoomID, 1);
    //The old room's status is changed to "Available" (1)
    assert.strictEqual(rservice.FindRoom(1)?.Status, 1);
    //The old booking's end date is set
    assert.notEqual(bservice.FindByBookingID(1)?.EndDate, null);
});
//# sourceMappingURL=MovePatient.test.js.map