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
test("Room booking works correctly", () => {
    const brepo = new InMemoryBookingRepository();
    const prepo = new InMemoryPatientRepository();
    const rrepo = new InMemoryRoomRepository();
    const room1 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 1,
        EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"], Equipment["IVPole"]],
        DailyCost: 23,
        Status: Status["Available"] });
    const room2 = RoomSimpleFactory.AddRoom("PrivateRoom", { RoomID: 2,
        EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"]],
        DailyCost: 23,
        Status: Status["Available"] });
    const room3 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 3,
        EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"]],
        DailyCost: 23,
        Status: Status["Available"] });
    const patient1 = new Patient(1, "Belko Diallo", new Date("2006-02-21"), new Date("2026-05-17"), null, 23, [Equipment["Bed"], Equipment["Defibrilator"]]);
    const patient2 = new Patient(2, "Abdoul Aziz", new Date("2006-02-21"), new Date("2026-05-17"), null, 23, [Equipment["Bed"], Equipment["IVPole"]]);
    //valid booking
    const booking1 = new Booking(1, 1, 1, new Date("2026-05-18"), null);
    //double booking
    const booking2 = new Booking(1, 1, 1, new Date("2026-05-18"), null);
    //Inapropriate clinical needs to room equipment booking
    const booking3 = new Booking(2, 2, 2, new Date("2026-05-18"), null);
    //Multiple bookings for patient1
    const booking4 = new Booking(3, 1, 3, new Date("2026-05-18"), null);
    const pservice = new PatientService(prepo);
    const rservice = new RoomService(rrepo);
    const bservice = new BookingService(brepo, pservice, rservice);
    pservice.RegisterPatient(patient1);
    pservice.RegisterPatient(patient2);
    rservice.AddRoom(room1);
    rservice.AddRoom(room2);
    bservice.BookRoom(booking1);
    //booking2 cannot be booked as an identical booking1 was already booked
    assert.strictEqual(bservice.BookRoom(booking2), "Can't book room");
    //booking3 cannot be booked due to clinical needs to room equipment mismatch
    assert.strictEqual(bservice.BookRoom(booking3), "Can't book room");
    //booking1 is booked
    assert.deepStrictEqual(bservice.All(), [new Booking(1, 1, 1, new Date("2026-05-18"), null)]);
    //booking 4 cannot be booked as it involves a patient who already has a booking
    assert.strictEqual(bservice.BookRoom(booking4), "Can't book room");
});
//# sourceMappingURL=BookRoom.test.js.map