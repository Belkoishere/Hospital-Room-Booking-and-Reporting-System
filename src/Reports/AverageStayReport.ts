import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";
import { RoomService } from "../Services/RoomService.js";

export class AverageStayReport extends Report {
  constructor(private readonly bservice: BookingService, private readonly rservice: RoomService) {
    super();
  }

  protected run(params: Map<string, any>): number | null {
    const type = params.get("Type");
    const AllBookings = this.bservice.All();

    if (type === "All"){
      //only include completed bookings
      const CompletedBookings = AllBookings.filter(b => b.EndDate !== null);
      let TotalStay = 0;

      // Calcaulate total days stayed for completed bookings
      CompletedBookings.forEach(b => {
        let diffDays = this.dateDiffInDays(b.EndDate, b.BookingDate);
        if (diffDays !== null){
          TotalStay += diffDays;
        }
      });

      //Return average number of days stayed
      return Number((TotalStay / CompletedBookings.length).toFixed());
    }
      
    //Filter completed bookings by room type
    const CompletedBookings = AllBookings.filter(b => b.EndDate !== null 
    && this.rservice.FindRoom(b.RoomID)?.GetType() === type);

    let TotalStay = 0;

    //Calculate total days stayed for completed bookings of input room type
    CompletedBookings.forEach(b => {
      let diffDays = this.dateDiffInDays(b.EndDate, b.BookingDate);
      if (diffDays !== null){
        TotalStay += diffDays;
      }
    });

    //Return average number of days stayed for a specific room type
    return Number((TotalStay / CompletedBookings.length).toFixed());

  }

  //Calcualte difference in days between two input dates
  dateDiffInDays(a: Date | null, b: Date): number | null {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    if (a != null){
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }

    return null;
    
  }
    
}
