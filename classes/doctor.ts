import { ClinicScheduleInterface, DoctorInterface, ScheduleInterface } from "@/interfaces/doctor";

export class DoctorClass implements DoctorInterface {
  title?: string;
  designation?: string;
  name: string;
  serviceTags: string[];
  phoneNumber: string;
  specialties?: string[];
  clinicSchedules: ClinicScheduleClass[];

  constructor(
    name: string,
    serviceTags: string[],
    phoneNumber: string,
    clinicSchedules: ClinicScheduleClass[],
    specialties?: string[],
    title?: string, 
    designation?: string) {
    this.name = name;
    this.serviceTags = serviceTags;
    this.phoneNumber = phoneNumber;
    this.clinicSchedules = clinicSchedules;
    this.specialties = specialties;
    this.designation = designation;
    this.title = title
  }
}

export class ClinicScheduleClass implements ClinicScheduleInterface {
  clinicLocation: string;
  schedules: ScheduleClass[];

  constructor(clinicLocation: string, schedules: ScheduleClass[]) {
    this.clinicLocation = clinicLocation;
    this.schedules = schedules ?? [];
  }
}

export class ScheduleClass implements ScheduleInterface {
  day: Day;
  start: string;
  end: string;

  constructor(day: Day, start: string, end: string) {
    this.day = day ?? Day.Monday;
    this.start = start ?? "9:00 AM";
    this.end = end ?? "12:00 NN";
  }
}

export enum Day {
  Monday = "MON",
  Tuesday = "TUE",
  Wednesday = "WED",
  Thursday = "THU",
  Friday = "FRI",
  Saturday = "SAT",
  Sunday = "SUN"
}