import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
import { Room } from "../Rooms/Rooms.js";
import { Status } from "../Enumerations/Status.js";

export class AvailableRoomsReport extends Report {
  constructor(private readonly rservice: RoomService) {
    super();
  }

  protected run(params: Map<string, any>): Room[] | string {
    const type = params.get("Type");
    const all = this.rservice.AllRooms();

    // Return all available rooms
    if (type === "All"){
        return all.filter(r => r.Status === Status["Available"]);
    }
    
    //Return all available rooms of input type
    return all.filter(r => r.GetType() === type && r.Status === Status["Available"]);

  }
}
