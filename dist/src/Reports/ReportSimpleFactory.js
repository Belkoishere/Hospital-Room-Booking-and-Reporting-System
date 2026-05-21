import { ReportRequest } from "./ReportRequest.js";
import { RoomOccupancyReport } from "./RoomOccupancyReport.js";
import { AverageStayReport } from "./AverageStayReport.js";
import { AvailableRoomsReport } from "./AvailableRoomsReport.js";
import { PatientNumbersReport } from "./PatientNumbersReport.js";
import { Report } from "./Report.js";
export class ReportSimpleFactory {
    //Pass in context as any type to allow multiple contexts to be passed in as an array
    //Report request includes report type to select a report to be returned
    static CreateReport(request, context) {
        switch (request.GetReportType()) {
            case "RoomOccupancy":
                return new RoomOccupancyReport(context.roomService);
            case "AverageStay":
                return new AverageStayReport(context[0].bookingService, context[1].roomService);
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