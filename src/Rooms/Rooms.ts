import {Equipment} from "../Enumerations/Equipment.js";
import {Status} from "../Enumerations/Status.js";
import type { RoomConfig } from "./RoomConfig.js";

export abstract class Room {

  public RoomID!: number;
  public EquipmentList!: Equipment[];
  public DailyCost!: number;
  public Status!: Status;

  constructor(RoomConfig: RoomConfig) {
    Object.assign(this, RoomConfig);
  }

  //Return room type through a method to enforce encapsulation
  abstract GetType(): string;
}

//Concrete rooms defined from Room

export class ICUBay extends Room {
  GetType(): string {
    return "ICUBay";
  }
}

export class IsolationRoom extends Room {
  GetType(): string {
    return "IsolationRoom";
  }
}

export class PrivateRoom extends Room {
  GetType(): string {
    return "PrivateRoom";
  }
}

export class WardBay extends Room {
  GetType(): string {
    return "WardBay";
  }
}