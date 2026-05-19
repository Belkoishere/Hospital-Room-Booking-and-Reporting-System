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
const brepo = new InMemoryBookingRepository();
const prepo = new InMemoryPatientRepository();
const rrepo = new InMemoryRoomRepository();
const room = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 1,
    EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"], Equipment["IVPole"]],
    DailyCost: 23,
    Status: Status["Available"] });
const patient = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("17/05/2026"), null, 23, [Equipment["Bed"], Equipment["Defibrilator"]]);
const booking = new Booking(1, 1, 1, new Date("18/05/2026"), null);
// The biz level logic - repo is passed in to service (DIP)
const pservice = new PatientService(prepo);
const rservice = new RoomService(rrepo);
const bservice = new BookingService(brepo, pservice, rservice);
test("Patient is registered and room is added", () => {
    pservice.RegisterPatient(patient);
    rservice.AddRoom(room);
    assert.strictEqual(pservice.FindPatient(1)?.Name, "Belko Diallo");
    assert.strictEqual(rservice.FindRoom(1)?.DailyCost, 23);
});
test("Room is suitable for patient", () => {
    assert.strictEqual(bservice.IsSuitable(1, 1), true);
});
test("Room is booked", () => {
    bservice.BookRoom(booking);
    assert.strictEqual(bservice.FindByBookingID(1)?.PatientID, 1);
});
//# sourceMappingURL=BookRoom.test.js.map