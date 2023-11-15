import { PersonalDetailsFormInterface, VisitScheduleInterface } from "@/shared/interfaces/appointment.interface";
import { ServiceClass } from "./service";
import { DoctorClass } from "./doctor";
import { getFullDateString, getMonthName } from "@/shared/utilities/helpers";

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
  medicalFile?: File;

  static readonly numOfRequiredProps: number = 10; 

  constructor(
    personalDetails: PersonalDetailsFormInterface,
    selectedService: ServiceClass,
    selectedDoctor: DoctorClass,
    visitSchedule: VisitScheduleInterface
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
    this.medicalFile = personalDetails.medicalConcernDocument ?? undefined;
  }
}