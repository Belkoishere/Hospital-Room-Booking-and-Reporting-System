import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";
import { Status } from "../Enumerations/Status.js";

export class RoomOccupancyReport extends Report {
  constructor(private readonly rservice: RoomService) {
    super();
  }

  protected run(params: Map<string, any>): number | null {
    const type = params.get("Type");
    const AllRooms = this.rservice.AllRooms();
    
    if (type === "All"){
        const occupied = AllRooms.filter(r => r.Status === Status["Occupied"]).length;
        const all = AllRooms.length;

        if (all != 0){
          return Number(((occupied/all)*100).toFixed(2));
        }

        return null;
    }

    const occupied = AllRooms.filter(r => r.GetType() === type && r.Status === Status["Occupied"]).length;
    const all = AllRooms.length;
    
    if (all != 0){
      return Number(((occupied/all)*100).toFixed(2));
    }

    return null;
      
  }
}

