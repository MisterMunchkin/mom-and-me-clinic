import { PersonalDetailsMTFormInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import { ServiceClass } from "./service";
import { DoctorClass } from "./doctor";
import { monthNames } from "@/utilities/constants";

export class AppointmentSubmitRequest {
  patientFullName: string;
  patientDateOfBirth: string;
  patientPhoneNumber: string;
  patientSex: string;
  patientMedicalConcern: string;
  honeyPotEmail?: string;
  doctorFullName: string;
  doctorEmail: string;
  selectedService: string;
  preferredSchedule: string;

  static readonly numOfRequiredProps: number = 9; 

  constructor(
    personalDetails: PersonalDetailsMTFormInterface,
    selectedService: ServiceClass,
    selectedDoctor: DoctorClass,
    visitSchedule: VisitScheduleMTInterface
  ) {
    this.patientFullName = `${personalDetails.firstName}${(personalDetails.middleName) ? ' ' + personalDetails.middleName : ''} ${personalDetails.lastName}`.trim();
    const { month, day, year } = personalDetails.dateOfBirth;
    this.patientDateOfBirth = `${monthNames[month]} ${day}, ${year}`;
    this.patientPhoneNumber = personalDetails.phoneNumber.trim();
    this.patientSex = personalDetails.sex;
    this.patientMedicalConcern = personalDetails.medicalConcern.trim();
    this.honeyPotEmail = personalDetails.honeyPotEmail;
    this.doctorFullName = selectedDoctor.name
    this.doctorEmail = selectedDoctor.email;
    this.selectedService = selectedService.name;
    this.preferredSchedule = `${visitSchedule.preferredDate} ${visitSchedule.preferredTimeBlock}`;
  }
}