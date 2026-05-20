import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { Status } from "../src/Enumerations/Status.js";
import { InMemoryBookingRepository } from "../src/Repositories/BookingRepository/InMemoryBookingRepository.js"
import { BookingService } from "../src/Services/BookingService.js";
import { Booking } from "../src/Bookings/Booking.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js"
import { RoomService } from "../src/Services/RoomService.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js"
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";

test("Remove booking", () => {

    const brepo = new InMemoryBookingRepository();  
    const prepo = new InMemoryPatientRepository();
    const rrepo = new InMemoryRoomRepository();

    const room1 = RoomSimpleFactory.AddRoom(
    "WardBay", 
    {RoomID: 1, 
    EquipmentList: [Equipment["Bed"], Equipment["Defibrilator"], Equipment["IVPole"]], 
    DailyCost: 23, 
    Status: Status["Available"]});

    const room2 = RoomSimpleFactory.AddRoom(
    "PrivateRoom", 
    {RoomID: 2, 
    EquipmentList: [Equipment["Bed"], Equipment["IVPole"]], 
    DailyCost: 23, 
    Status: Status["Available"]});


    const patient1 = new Patient(
    1, 
    "Belko Diallo", 
    new Date("2006-02-21"), 
    new Date("2026-05-17"),
    null, 
    23, 
    [Equipment["Bed"], Equipment["Defibrilator"]]);

    const patient2 = new Patient(
    2, 
    "Abdoul Aziz", 
    new Date("2006-02-21"), 
    new Date("2026-05-17"),
    null, 
    23, 
    [Equipment["Bed"], Equipment["IVPole"]]);

    //valid booking
    const booking1 = new Booking
    (1, 1, 1,
    new Date("2026-05-18"),
    null
    ); 

    //valid booking
    const booking2 = new Booking
    (2, 2, 2,
    new Date("2026-05-13"),
    null
    ); 

    const pservice = new PatientService(prepo);
    const rservice = new RoomService(rrepo);
    const bservice = new BookingService(brepo, pservice, rservice);

    pservice.RegisterPatient(patient1);
    pservice.RegisterPatient(patient2);
    rservice.AddRoom(room1);
    rservice.AddRoom(room2);
    bservice.BookRoom(booking1);
    bservice.BookRoom(booking2);
    bservice.RemoveBooking(1);

    assert.deepStrictEqual(bservice.All(), [new Booking(2, 2, 2, new Date("2026-05-13"), null)]);

});



