import { DoctorClass } from "@/classes/doctor";

export interface AppointmentInterface {
  preferredDate?: Date;
  preferredTimeBlock: string;
  doctor?: DoctorClass;
  location: string;
  name: string;
  age?: number;
  phoneNumber: string;
  selectedService: string;
  medicalConcern: string;

}