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
import { Room } from "./Rooms/Rooms.js";
import { Booking } from "./Bookings/Booking.js";
import { RoomContext } from "./Reports/RoomContext.js";
import { ReportRequest } from "./Reports/ReportRequest.js";
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
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
const room2 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
const room3 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
const room4 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
const room5 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
    DailyCost: 20,
    Status: Status["Available"] });
rservice.AddRoom(room1);
rservice.AddRoom(room2);
rservice.AddRoom(room3);
rservice.AddRoom(room4);
rservice.AddRoom(room5);
//Add 4 patients
const patient1 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient2 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient3 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
const patient4 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
pservice.RegisterPatient(patient1);
pservice.RegisterPatient(patient2);
pservice.RegisterPatient(patient3);
pservice.RegisterPatient(patient4);
//Book 4 rooms
const booking1 = new Booking(1, 1, 1, new Date("2026-05-18"), null);
const booking2 = new Booking(1, 1, 1, new Date("2026-05-18"), null);
const booking3 = new Booking(2, 2, 2, new Date("2026-05-18"), null);
const booking4 = new Booking(3, 1, 3, new Date("2026-05-18"), null);
bservice.BookRoom(booking1);
bservice.BookRoom(booking2);
bservice.BookRoom(booking3);
bservice.BookRoom(booking4);
bservice.MovePatient(1, 5);
const rcontext = new RoomContext(rservice);
const params = new Map([["Type", "All"]]);
const request = new ReportRequest("RoomOccupancy", params);
const report = ReportSimpleFactory.CreateReport(request, rcontext);
const result = report.GenerateReport(request);
console.log(rservice.AllRooms());
//# sourceMappingURL=Main.js.map