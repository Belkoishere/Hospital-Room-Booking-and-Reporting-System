import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";
test("Remove patient", () => {
    const repo = new InMemoryPatientRepository();
    const patient1 = new Patient(1, "Belko Diallo", new Date("2006-02-21"), new Date("2026-05-15"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const patient2 = new Patient(2, "John Doe", new Date("2006-02-21"), new Date("2026-05-15"), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const service = new PatientService(repo);
    service.RegisterPatient(patient1);
    service.RegisterPatient(patient2);
    service.RemovePatient(1);
    assert.deepStrictEqual(service.AllPatients(), [new Patient(2, "John Doe", new Date("2006-02-21"), new Date("2026-05-15"), null, 5, [Equipment.Bed, Equipment.InfusionPump])]);
});
//# sourceMappingURL=RemovePatient.test.js.map