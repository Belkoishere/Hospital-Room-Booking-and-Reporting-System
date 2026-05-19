import { ReportRequest } from "./ReportRequest.js";
import { RoomOccupancyReport } from "./RoomOccupancyReport.js";
import { AverageStayReport } from "./AverageStayReport.js";
import { AvailableRoomsReport } from "./AvailableRoomsReport.js";
import { PatientNumbersReport } from "./PatientNumbersReport.js";
import { Report } from "./Report.js";
export class ReportFactory {
    static CreateReport(request, context) {
        switch (request.GetReportType()) {
            case "RoomOccupancy":
                return new RoomOccupancyReport(context.roomService);
            case "AverageStay":
                return new AverageStayReport(context.bookingService);
            case "AvailableRooms":
                return new AvailableRoomsReport(context.roomService);
            case "PatientNumbers":
                return new PatientNumbersReport(context.patientService);
            default:
                throw new Error("Unknown report type");
        }
    }
}
//# sourceMappingURL=ReportSimpleFactory.js.map