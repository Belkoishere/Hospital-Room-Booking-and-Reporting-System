import { Equipment } from "../Enumerations/Equipment.js";
export declare class Patient {
    PatientID: number;
    Name: string;
    DateOfBirth: Date;
    AdmissionDate: Date;
    ExpectedStayDuration: number;
    ClinicalRequirements: Equipment[];
    constructor(PatientID: number, Name: string, DateOfBirth: Date, AdmissionDate: Date, ExpectedStayDuration: number, ClinicalRequirments: Equipment[]);
}
//# sourceMappingURL=Patient.d.ts.map