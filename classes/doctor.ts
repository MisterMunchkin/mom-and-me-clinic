import { ClinicScheduleInterface, DoctorInterface, ScheduleInterface } from "@/interfaces/doctor";
import { getEnumByValue } from "@/utilities/helpers";

export class DoctorClass implements DoctorInterface {
  readonly title?: string;
  readonly designation?: string;
  readonly name: string;
  readonly serviceTags: string[];
  readonly joinedServiceTags: string = '';
  readonly phoneNumber: string;
  readonly email: string;
  readonly specialties?: string[];
  readonly clinicSchedules: ClinicScheduleClass[];

  constructor(
    name: string,
    serviceTags: string[],
    joinedServiceTags: string,
    phoneNumber: string,
    email: string,
    clinicSchedules: ClinicScheduleInterface[],
    specialties?: string[],
    title?: string, 
    designation?: string) {
    this.name = name;
    this.serviceTags = serviceTags ?? [];
    this.joinedServiceTags = joinedServiceTags ?? '';
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.specialties = specialties;
    this.designation = designation;
    this.title = title;

    this.clinicSchedules = clinicSchedules?.map(clinicSchedule => 
      new ClinicScheduleClass(
        clinicSchedule.clinicLocation, 
        clinicSchedule.schedules)
    ) ?? []
  }

  public static fromInterface(doctorInterface: DoctorInterface) {
    return new DoctorClass (
      doctorInterface.name,
      doctorInterface.serviceTags,
      this.getJoinedTags(doctorInterface.serviceTags),
      doctorInterface.phoneNumber,
      doctorInterface.email,
      doctorInterface.clinicSchedules,
      doctorInterface.specialties,
      doctorInterface.title,
      doctorInterface.designation
    )
  }

  public getFullTitle(): string {
    return `${(this.title) ? this.title + '. ' : ''}${this.name}${(this.designation) ? ', ' + this.designation : ''}`;
  }

  public static getJoinedTags(tags: string[]): string {
    return tags?.join(' ');
  }
}

export class ClinicScheduleClass implements ClinicScheduleInterface {
  clinicLocation: string;
  schedules: ScheduleClass[];


  constructor(clinicLocation: string, schedules: ScheduleInterface[]) {
    this.clinicLocation = clinicLocation;
    this.schedules = schedules?.map(schedule => 
      new ScheduleClass(
        getEnumByValue(Day, schedule.day),
        schedule.start, 
        schedule.end)
    ) ?? [];
  }
}

export class ScheduleClass implements ScheduleInterface {
  day: Day;
  start: string;
  end: string;

  constructor(day?: Day, start?: string, end?: string) {
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