import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";

export interface AppointmentFormInterface {
  preferredDate?: Date;
  preferredTimeBlock: string;
  doctorName: string;
  location: string;
  name: string;
  age?: number;
  phoneNumber: string;
  selectedService: string;
  medicalConcern: string;
  honeyPotEmail?: string;
}

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