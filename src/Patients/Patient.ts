import { Equipment } from "../Enumerations/Equipment.js";

export class Patient {

  PatientID: number;
  Name: string;
  DateOfBirth: Date;
  AdmissionDate: Date;
  ExpectedStayDuration: number;
  ClinicalRequirments: Equipment[];

  constructor(PatientID: number, Name: string, DateOfBirth: Date, AdmissionDate: Date, ExpectedStayDuration: number, ClinicalRequirments: Equipment[]) {
    this.PatientID = PatientID;
    this.Name = Name;
    this.DateOfBirth = DateOfBirth;
    this.AdmissionDate = AdmissionDate;
    this.ExpectedStayDuration = ExpectedStayDuration;
    this.ClinicalRequirments = ClinicalRequirments;
  }
}