import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { InMemoryBookingRepository } from "../src/Repositories/BookingRepository/InMemoryBookingRepository.js";
import { BookingService } from "../src/Services/BookingService.js";

const rrepo = new InMemoryRoomRepository();
const prepo = new InMemoryPatientRepository();
const brepo = new InMemoryBookingRepository();

const rservice = new RoomService(rrepo); 
const pservice = new PatientService(prepo);
const bservice = new BookingService(brepo, pservice, rservice);

rservice.RemoveAllRooms();
pservice.RemoveAllPatients();
bservice.RemoveAllBookings();