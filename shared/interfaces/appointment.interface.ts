import { DoctorClass } from "@/shared/classes/doctor";
import { ServiceClass } from "@/shared/classes/service";

export interface AppointmentFormInterface {
  personalDetails?: PersonalDetailsFormInterface;
  selectedService?: ServiceClass;
  selectedDoctor?: DoctorClass;
  visitSchedule?: VisitScheduleInterface;
}

export interface PersonalDetailsFormInterface {
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
  medicalConcernDocument?: File | null;
  honeyPotEmail?: string;
}

export interface VisitScheduleInterface {
  preferredDate?: Date;
  preferredTimeBlock?: string;
}