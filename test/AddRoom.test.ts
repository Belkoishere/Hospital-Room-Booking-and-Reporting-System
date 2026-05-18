import test from "node:test";
import assert from "node:assert/strict";
import { Status } from "../src/Enumerations/Status.js";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { RoomSimpleFactory } from "../src/Rooms/RoomSimpleFactory.js";
import { InMemoryRoomRepository } from "../src/Repositories/RoomRepository/InMemoryRoomRepository.js";
import { RoomService } from "../src/Services/RoomService.js";


test("Rooms are instantiated and stored correctly", () => {
    const room1 = RoomSimpleFactory.AddRoom(
    "ICUBay", 
    {RoomID: 23, 
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]], 
    DailyCost: 20, 
    Status: Status["Available"]});
    

    const room2 = RoomSimpleFactory.AddRoom(
    "WardBay", 
    {RoomID: 24, 
    EquipmentList: [Equipment["InfusionPump"], Equipment["ECG"], Equipment["Defibrilator"], Equipment["PulseOximeter"]], 
    DailyCost: 25, 
    Status: Status["Available"]});

    // Could easily change repo for example to CsvStudentRepository("students.csv")
    const repo = new InMemoryRoomRepository();  

    // The biz level logic - repo is passed in to service (DIP)
    const service = new RoomService(repo);
    service.AddRoom(room1);
    service.AddRoom(room2);

    let FindRoom1 = service.FindRoom(23);
    let FindRoom2 = service.FindRoom(24);

    assert.strictEqual(room1.GetType(), "ICUBay");   
    assert.strictEqual(room2.GetType(), "WardBay");
    assert.strictEqual(FindRoom1?.GetType(), "ICUBay");
    assert.strictEqual(FindRoom2?.GetType(), "WardBay");
    assert.strictEqual(FindRoom1?.Status, Status["Available"]);
    assert.strictEqual(FindRoom2?.Status, Status["Available"]);
});