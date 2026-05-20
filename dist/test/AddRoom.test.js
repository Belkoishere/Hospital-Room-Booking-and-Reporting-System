import test from "node:test";
import assert from "node:assert/strict";
import { Status } from "../src/Enumerations/Status.js";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";
import { ICUBay } from "../src/Rooms/Rooms.js";
import { WardBay } from "../src/Rooms/Rooms.js";
test("Rooms are instantiated and stored correctly", () => {
    //valid room
    const room1 = RoomSimpleFactory.AddRoom("ICUBay", { RoomID: 1,
        EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 20,
        Status: Status["Available"] });
    //valid room
    const room2 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 2,
        EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    //double added room
    const room3 = RoomSimpleFactory.AddRoom("WardBay", { RoomID: 2,
        EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
        DailyCost: 25,
        Status: Status["Available"] });
    const repo = new InMemoryRoomRepository();
    const service = new RoomService(repo);
    service.AddRoom(room1);
    service.AddRoom(room2);
    service.AddRoom(room3);
    // Rooms cannot be double added
    assert.strictEqual(service.AddRoom(room3), "Room cannot be added");
    // Two rooms are successfully added
    assert.deepStrictEqual(service.AllRooms(), [
        new ICUBay({ RoomID: 1,
            EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
            DailyCost: 20,
            Status: Status["Available"] }),
        new WardBay({ RoomID: 2,
            EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]],
            DailyCost: 25,
            Status: Status["Available"] })
    ]);
});
//# sourceMappingURL=AddRoom.test.js.map