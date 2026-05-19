import { Report } from "./Report.js";
import { RoomService } from "../Services/RoomService.js";

export class RoomOccupancyReport extends Report {
  constructor(private readonly rservice: RoomService) {
    super();
  }

  protected run(params: Map<string, any>): number | null {
    const type = params.get("Type");
    
    return 45;
  }
}

