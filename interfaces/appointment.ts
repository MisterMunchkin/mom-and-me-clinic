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
  honeyPotEmail?: string;
}
