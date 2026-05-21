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
test("Room occupancy report", () => {
    // Could easily change repo that is used
    const repo = new InMemoryRoomRepository();
    const room1 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 23,
        EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 20,
        Status: Status["Available"] });
    const room2 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 24,
        EquipmentList: [Equipment["Bed"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Occupied"] });
    const room3 = RoomSimpleFactory.AddRoom("IsolationRoom", { RoomID: 25,
        EquipmentList: [Equipment["Bed"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["OutOfService"] });
    const room4 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 26,
        EquipmentList: [Equipment["Bed"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Occupied"] });
    const room5 = RoomSimpleFactory.AddRoom("PrivateRoom", { RoomID: 27,
        EquipmentList: [Equipment["Bed"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    const room6 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 28,
        EquipmentList: [Equipment["Bed"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    const service = new RoomService(repo);
    service.AddRoom(room1);
    service.AddRoom(room2);
    service.AddRoom(room3);
    service.AddRoom(room4);
    service.AddRoom(room5);
    service.AddRoom(room6);
    const context = new RoomContext(service);
    const params = new Map([["Type", "All"]]);
    const request = new ReportRequest("RoomOccupancy", params);
    const report = ReportSimpleFactory.CreateReport(request, context);
    const result = report.GenerateReport(request);
    // 33.33% of rooms are occupied
    assert.strictEqual(result, 33.33);
});
//# sourceMappingURL=RoomOccupancyReport.test.js.map