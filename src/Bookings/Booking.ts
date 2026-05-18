export class Booking {

    public BookingID: number;
    public PatientID: number;
    public RoomID: number;
    public BookingDate: Date;
    public EndDate: Date | null;

    constructor(BookingID: number, PatientID: number, RoomID: number, BookingDate: Date, EndDate: Date | null) {
    
        this.PatientID = PatientID;
        this.BookingID = BookingID;
        this.RoomID = RoomID;
        this.BookingDate = BookingDate;
        this.EndDate = EndDate;
    }
}