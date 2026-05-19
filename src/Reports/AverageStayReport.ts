import { Report } from "./Report.js";
import { BookingService } from "../Services/BookingService.js";
import { RoomService } from "../Services/RoomService.js";
import { Booking } from "../Bookings/Booking.js";

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

      CompletedBookings.forEach(b => {
        let diffDays = this.dateDiffInDays(b.EndDate, b.BookingDate);
        if (diffDays !== null){
          TotalStay += diffDays;
        }
      });
      
      return Number((TotalStay / CompletedBookings.length).toFixed(2));
    }
        
    const CompletedBookings = AllBookings.filter(b => b.EndDate !== null 
    && this.rservice.FindRoom(b.RoomID)?.GetType() === type);

    let TotalStay = 0;

    CompletedBookings.forEach(b => {
      let diffDays = this.dateDiffInDays(b.EndDate, b.BookingDate);
      if (diffDays !== null){
        TotalStay += diffDays;
      }
    });

    return Number((TotalStay / CompletedBookings.length).toFixed(2));

  }

  dateDiffInDays(a: Date | null, b: Date): number | null {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.

    if (a != null){
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }

    return null;
    
  }
    
}
