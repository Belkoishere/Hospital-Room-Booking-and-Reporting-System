import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";
test("Register patient", () => {
    const repo = new InMemoryPatientRepository();
    const patient1 = new Patient(1, "Belko Diallo", new Date("21/02/2006"), new Date("16/05/2026"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const service = new PatientService(repo);
    service.RegisterPatient(patient1);
    // Patient is added successfully
    assert.equal(service.FindPatient(1)?.Name, "Belko Diallo");
    assert.strictEqual(service.AllPatients().length, 1);
});
//# sourceMappingURL=RegisterPatient.test.js.map