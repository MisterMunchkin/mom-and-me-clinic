import { DoctorClass } from "@/shared/classes/doctor";
import { ServiceClass } from "@/shared/classes/service";

export interface AppointmentFormMTInterface {
  personalDetails?: PersonalDetailsMTFormInterface;
  selectedService?: ServiceClass;
  selectedDoctor?: DoctorClass;
  visitSchedule?: VisitScheduleMTInterface;
}

export interface PersonalDetailsMTFormInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: {
    day: number,
    month: number,
    year: number
  };
  phoneNumber: string;
  sex: string;
  medicalConcern: string;
  honeyPotEmail?: string;
}

export interface VisitScheduleMTInterface {
  preferredDate?: Date;
  preferredTimeBlock?: string;
}