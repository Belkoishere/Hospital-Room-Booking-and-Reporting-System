import {Equipment} from "../Enumerations/Equipment.js";
import {Status} from "../Enumerations/Status.js";

export abstract class Room {

  RoomID: number;
  EquipmentList: Equipment[];
  DailyCost: number;
  Status: Status;

  constructor(RoomID: number, EquipmentList: Equipment[], DailyCost: number, Status: Status) {
    this.RoomID = RoomID;
    this.EquipmentList = EquipmentList;
    this.DailyCost = DailyCost;
    this.Status = Status;
  }
}