import { ReportFactory } from "../src/Reports/ReportSimpleFactory.js";
import { ReportRequest } from "../src/Reports/ReportRequest.js";
import test from "node:test";
import assert from "node:assert/strict";
import { Equipment } from "../src/Enumerations/Equipment.js";
import { InMemoryPatientRepository } from "../src/Repositories/PatientRepository/InMemoryPatientRepository.js";
import { PatientService } from "../src/Services/PatientService.js";
import { Patient } from "../src/Patients/Patient.js";
import { PatientContext } from "../src/Reports/PatientContext.js";
test("Patient numbers report generates results correctly", () => {
    // Could easily change repo for example to CsvStudentRepository("students.csv")
    const repo = new InMemoryPatientRepository();
    let patient1 = new Patient(1, "Belko Diallo", new Date(), new Date(), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    let patient2 = new Patient(2, "Belko Diallo", new Date(), new Date(), null, 5, [Equipment["Bed"], Equipment["InfusionPump"]]);
    const service = new PatientService(repo);
    service.RegisterPatient(patient1);
    service.RegisterPatient(patient2);
    const context = new PatientContext(service);
    const params = new Map([["Type", "Current"]]);
    const request = new ReportRequest("PatientNumbers", params);
    const report = ReportFactory.CreateReport(request, context);
    const result = report.GenerateReport(request);
    assert.strictEqual(result, 2);
});
//# sourceMappingURL=PatientNumbersReport.test.js.map