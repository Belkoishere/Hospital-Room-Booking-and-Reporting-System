import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";
test("Patients are instantiated and stored correctly", () => {
    // Could easily change repo for example to CsvStudentRepository("students.csv")
    const repo = new InMemoryPatientRepository();
    const patient1 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    // The biz level logic - repo is passed in to service (DIP)
    const service = new PatientService(repo);
    service.RegisterPatient(patient1);
    let FindPatient1 = service.FindPatient(1);
    assert.strictEqual(patient1.Name, "Belko Diallo");
    assert.strictEqual(FindPatient1?.Name, "Belko Diallo");
    assert.strictEqual(FindPatient1?.PatientID, 1);
    assert.strictEqual(service.All().length, 1);
});
//# sourceMappingURL=RegisterPatient.test.js.map