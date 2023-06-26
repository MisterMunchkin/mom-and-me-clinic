export interface DoctorInterface {
  title?: string
  designation?: string
  name: string
  serviceTags: string[]
  phoneNumber: string
  specialties?: string[]
  clinicSchedules: ClinicScheduleInterface[]
}

export interface ClinicScheduleInterface {
  clinicLocation: string
  schedules: ScheduleInterface[]
}

export interface ScheduleInterface {
  day: string
  start: string
  end: string
}
