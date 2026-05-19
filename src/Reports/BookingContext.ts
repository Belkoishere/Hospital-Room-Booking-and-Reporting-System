import { BookingService } from "../Services/BookingService.js";

export class BookingContext {
  constructor(
    public readonly bookingService: BookingService,
  ) {}
}
