import test from "node:test";
import assert from "node:assert/strict";
import { Status } from "../src/Enumerations/Status.js";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";
import { InMemoryBookingRepository } from "../src/Repositories/BookingRepository/InMemoryBookingRepository.js";
import { BookingService } from "../src/Services/BookingService.js";
import { Booking } from "../src/Bookings/Booking.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { Patient } from "../src/Patients/Patient.js";
import { PatientService } from "../src/Services/PatientService.js";
import { RoomContext } from "../src/Reports/RoomContext.js";
import { ReportRequest } from "../src/Reports/ReportRequest.js";
import { ReportSimpleFactory } from "../src/Reports/ReportSimpleFactory.js";
import { BookingContext } from "../src/Reports/BookingContext.js";
test("Average stay report generates correct results", () => {
    const room1 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
        EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 20,
        Status: Status["Available"] });
    const room2 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 2,
        EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    const room3 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 3,
        EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    const patient1 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const patient2 = new Patient(2, "John Doe", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const patient3 = new Patient(3, "Kylian Mbappe", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const booking1 = new Booking(1, 1, 1, new Date("2025-06-01"), new Date("2026-02-03"));
    const booking2 = new Booking(2, 2, 2, new Date("2025-09-01"), new Date("2026-03-03"));
    const booking3 = new Booking(3, 3, 3, new Date("2025-10-01"), new Date("2026-02-01"));
    // Could easily change repo for example to CsvStudentRepository("students.csv")
    const rrepo = new InMemoryRoomRepository();
    const prepo = new InMemoryPatientRepository();
    const brepo = new InMemoryBookingRepository();
    // The biz level logic - repo is passed in to service (DIP)
    const rservice = new RoomService(rrepo);
    const pservice = new PatientService(prepo);
    const bservice = new BookingService(brepo, pservice, rservice);
    rservice.AddRoom(room1);
    rservice.AddRoom(room2);
    rservice.AddRoom(room3);
    pservice.RegisterPatient(patient1);
    pservice.RegisterPatient(patient2);
    pservice.RegisterPatient(patient3);
    bservice.BookRoom(booking1);
    bservice.BookRoom(booking2);
    bservice.BookRoom(booking3);
    const rcontext = new RoomContext(rservice);
    const bcontext = new BookingContext(bservice);
    const params = new Map([["Type", "All"]]);
    const request = new ReportRequest("AverageStay", params);
    const report = ReportSimpleFactory.CreateReport(request, [bcontext, rcontext]);
    const result = report.GenerateReport(request);
    assert.strictEqual(result, 184.33);
});
//# sourceMappingURL=AverageStayReport.test.js.map