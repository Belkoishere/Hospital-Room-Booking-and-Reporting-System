import { Equipment } from "../Enumerations/Equipment.js";

export class Patient {

  public PatientID: number;
  public Name: string;
  public DateOfBirth: Date;
  public AdmissionDate: Date;
  public DischargeDate: Date | null;
  public ExpectedStayDuration: number;
  public ClinicalRequirements: Equipment[];

  constructor(PatientID: number, Name: string, DateOfBirth: Date, AdmissionDate: Date, DischargeDate: Date | null, ExpectedStayDuration: number, ClinicalRequirments: Equipment[]) {
    this.PatientID = PatientID;
    this.Name = Name;
    this.DateOfBirth = DateOfBirth;
    this.AdmissionDate = AdmissionDate;
    this.DischargeDate = DischargeDate;
    this.ExpectedStayDuration = ExpectedStayDuration;
    this.ClinicalRequirements = ClinicalRequirments;
  }
}