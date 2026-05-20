import { ReportSimpleFactory } from "../src/Reports/ReportSimpleFactory.js";
import { ReportRequest } from "../src/Reports/ReportRequest.js";
import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";
import { RoomContext } from "../src/Reports/RoomContext.js";
import { Status } from "../src/Enumerations/Status.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { ICUBay } from "../src/Rooms/Rooms.js";
test("Available rooms report generates results correctly", () => {
    // Could easily change repo for example to CsvStudentRepository("students.csv")
    const repo = new InMemoryRoomRepository();
    const room1 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 23,
        EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 20,
        Status: Status["Available"] });
    const room2 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 24,
        EquipmentList: [Equipment["Bed"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["OutOfService"] });
    const service = new RoomService(repo);
    service.AddRoom(room1);
    service.AddRoom(room2);
    const context = new RoomContext(service);
    const params = new Map([["Type", "ICUBay"]]);
    const request = new ReportRequest("AvailableRooms", params);
    const report = ReportSimpleFactory.CreateReport(request, context);
    const result = report.GenerateReport(request);
    assert.deepStrictEqual(result, [
        new ICUBay({
            RoomID: 23,
            EquipmentList: [
                Equipment.InfusionPump,
                Equipment.ECG,
                Equipment.Defibrilator,
                Equipment.PulseOximeter
            ],
            DailyCost: 20,
            Status: Status.Available
        }),
    ]);
});
//# sourceMappingURL=AvailableRoomsReport.test.js.map