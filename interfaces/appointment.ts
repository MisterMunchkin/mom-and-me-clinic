import { DoctorClass } from "@/classes/doctor";

export interface AppointmentInterface {
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