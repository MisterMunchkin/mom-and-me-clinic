import { PersonalDetailsMTFormInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import { ServiceClass } from "./service";
import { DoctorClass } from "./doctor";
import { getFullDateString, getMonthName } from "@/utilities/helpers";

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
  location: string;

  static readonly numOfRequiredProps: number = 10; 

  constructor(
    personalDetails: PersonalDetailsMTFormInterface,
    selectedService: ServiceClass,
    selectedDoctor: DoctorClass,
    visitSchedule: VisitScheduleMTInterface
  ) {
    this.patientFullName = `${personalDetails.firstName}${(personalDetails.middleName) ? ' ' + personalDetails.middleName : ''} ${personalDetails.lastName}`.trim();
    const { month, day, year } = personalDetails.dateOfBirth;
    this.patientDateOfBirth = `${getMonthName(month)} ${day}, ${year}`;
    this.patientPhoneNumber = personalDetails.phoneNumber.trim();
    this.patientSex = personalDetails.sex;
    this.patientMedicalConcern = personalDetails.medicalConcern.trim();
    this.honeyPotEmail = personalDetails.honeyPotEmail;
    this.doctorFullName = selectedDoctor.name
    this.doctorEmail = selectedDoctor.email;
    this.selectedService = selectedService.name;
    this.preferredSchedule = `${getFullDateString(visitSchedule.preferredDate)} ${visitSchedule.preferredTimeBlock}`;
    this.location = 'Mom & Me Clinic - Room 611, Velez Medical Arts Building, 8V4W+WXR, Cebu City, Cebu';
  }
}