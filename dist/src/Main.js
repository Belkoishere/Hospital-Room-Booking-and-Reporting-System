import { RoomService } from "./Services/RoomService.js";
import { PatientService } from "./Services/PatientService.js";
import { BookingService } from "./Services/BookingService.js";
import { InMemoryRoomRepository } from "./Repositories/RoomRepository/InMemoryRoomRepository.js";
import { InMemoryPatientRepository } from "./Repositories/PatientRepository/InMemoryPatientRepository.js";
import { InMemoryBookingRepository } from "./Repositories/BookingRepository/InMemoryBookingRepository.js";
import { RoomSimpleFactory } from "./Rooms/RoomSimpleFactory.js";
import { ReportSimpleFactory } from "./Reports/ReportSimpleFactory.js";
import { Status } from "./Enumerations/Status.js";
import { Equipment } from "./Enumerations/Equipment.js";
import { Patient } from "./Patients/Patient.js";
import { Booking } from "./Bookings/Booking.js";
import { RoomContext } from "./Reports/RoomContext.js";
import { ReportRequest } from "./Reports/ReportRequest.js";
import { BookingContext } from "./Reports/BookingContext.js";
import { PatientContext } from "./Reports/PatientContext.js";
//Add 5 rooms, book 4 patients to 4 rooms, move 1 patient to another room, generate room occupancy report 
//services and repositories
const brepo = new InMemoryBookingRepository();
const rrepo = new InMemoryRoomRepository();
const prepo = new InMemoryPatientRepository();
const rservice = new RoomService(rrepo);
const pservice = new PatientService(prepo);
const bservice = new BookingService(brepo, pservice, rservice);
//Add 5 rooms
const room1 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
    EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
const room2 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 2,
    EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 23,
    Status: Status["Available"] });
const room3 = RoomSimpleFactory.AddRoom("PrivateRoom", { RoomID: 3,
    EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["Defibrilator"]],
    DailyCost: 14,
    Status: Status["Available"] });
const room4 = RoomSimpleFactory.AddRoom("IsolationRoom", { RoomID: 4,
    EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["PulseOximeter"]],
    DailyCost: 19,
    Status: Status["Available"] });
const room5 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 5,
    EquipmentList: [Equipment["Bed"], Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 26,
    Status: Status["Available"] });
rservice.AddRoom(room1);
rservice.AddRoom(room2);
rservice.AddRoom(room3);
rservice.AddRoom(room4);
rservice.AddRoom(room5);
//Add 4 patients
const patient1 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient2 = new Patient(2, "John Doe", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient3 = new Patient(3, "John Smith", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient4 = new Patient(4, "Mark Johnson", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
pservice.RegisterPatient(patient1);
pservice.RegisterPatient(patient2);
pservice.RegisterPatient(patient3);
pservice.RegisterPatient(patient4);
//Book 4 rooms
const booking1 = new Booking(1, 1, 1, new Date("2026-05-12"), null);
const booking2 = new Booking(2, 2, 2, new Date("2026-05-19"), null);
const booking3 = new Booking(3, 3, 3, new Date("2026-05-15"), null);
const booking4 = new Booking(4, 4, 4, new Date("2026-05-10"), null);
bservice.BookRoom(booking1);
bservice.BookRoom(booking2);
bservice.BookRoom(booking3);
bservice.BookRoom(booking4);
bservice.MovePatient(1, 5);
const rcontext = new RoomContext(rservice);
const bcontext = new BookingContext(bservice);
const pcontext = new PatientContext(pservice);
const params1 = new Map([["Type", "All"]]);
const request1 = new ReportRequest("RoomOccupancy", params1);
const report1 = ReportSimpleFactory.CreateReport(request1, rcontext);
const result1 = report1.GenerateReport(request1);
const params2 = new Map([["Type", "All"]]);
const request2 = new ReportRequest("PatientNumbers", params2);
const report2 = ReportSimpleFactory.CreateReport(request2, pcontext);
const result2 = report2.GenerateReport(request2);
const params3 = new Map([["Type", "All"]]);
const request3 = new ReportRequest("AvailableRooms", params3);
const report3 = ReportSimpleFactory.CreateReport(request3, rcontext);
const result3 = report3.GenerateReport(request3);
const params4 = new Map([["Type", "All"]]);
const request4 = new ReportRequest("AverageStay", params4);
const report4 = ReportSimpleFactory.CreateReport(request4, [bcontext, pcontext]);
const result4 = report4.GenerateReport(request4);
console.log("Room occupancy: " + result1.toString() + "%");
console.log("Number of patients: " + result2.toString());
console.log("Available rooms: " + result3.toString());
console.log("Average stay: " + result4.toString() + " days");
//# sourceMappingURL=Main.js.map