import { Status } from "../Enumerations/Status.js";
import { Equipment } from "../Enumerations/Equipment.js";

//Room config defines all atributes of room to be passed into the room simple factory constructor
export interface RoomConfig {
    RoomID: number, 
    EquipmentList: Equipment[], 
    DailyCost: number, 
    Status: Status
}