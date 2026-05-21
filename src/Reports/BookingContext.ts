import { BookingService } from "../Services/BookingService.js";

//Returns a reference to booking service
export class BookingContext {
  constructor(
    public readonly bookingService: BookingService,
  ) {}
}
