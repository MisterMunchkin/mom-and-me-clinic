'use client'

import { useCallback, useState } from "react";
import ServiceSelection from "./inputs/ServiceSelection";
import { ServiceClass } from "@/classes/service";
import useSWR from "swr";
import { DayNumber, DoctorClass } from "@/classes/doctor";
import DoctorSelection from "./inputs/DoctorSelection";
import { getIndexByName } from "@/utilities/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppointmentInterface } from "@/interfaces/appointment";

interface AppointmentFormProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentForm({defaultServiceName, defaultDoctorName}: AppointmentFormProps) {
  const serviceResponse = useSWR<ServiceClass[], any>('/api/services', fetcher);
  const doctorResponse = useSWR<DoctorClass[], any>('/api/doctors', fetcher);
  // const [ preferredDate, setPreferredDate ] = useState<Date>();
  // const [ selectedDoctor, setSelectedDoctor ] = useState<DoctorClass>();
  // //theres only one location for the website at the moment, in the future, we would need
  // //to flesh this out.
  // const [ selectedLocation, setSelectedLocation ] = useState("Mom & Me Clinic - Room 611");

  const [ formData, setFormData ] = useState<AppointmentInterface>({
    preferredTimeBlock: "",
    doctor: undefined,
    location: "Mom & Me Clinic - Room 611",
    name: "",
    age: undefined,
    phoneNumber: "",
    selectedService: "",
    medicalConcern: ""
  });

  const [ availableDayNumbers, setAvailableDayNumbers ] = useState<number[]>([]);
  const [ availableTimeBlocks, setAvailableTimeBlocks ] = useState<string[]>([]);

  const handleServiceChange = useCallback(
    (selectedService: ServiceClass) => {
      console.log(selectedService);
    }, []
  );

  const handleDoctorChange = useCallback(
    (selectedDoctor: DoctorClass) => {
      const updatedFormData = {
        ...formData,
        doctor: selectedDoctor,
        preferredDate: undefined,
        preferredTimeBlock: ""
      } as AppointmentInterface

      setFormData(updatedFormData)
      //changing doctor will filter the dates are available for that dr in a given week
      //This in turn should also display the available time blocks for the given day.
      const clinicSchedule = updatedFormData
      ?.doctor
      ?.clinicSchedules
      ?.find(clinicSchedule => clinicSchedule.clinicLocation === formData.location);
      
      if (clinicSchedule) {
        const availableDays = clinicSchedule.schedules.map(schedule => schedule.dayToNumberMap[schedule.day]);
        setAvailableDayNumbers(availableDays);
      }
    }, [formData]
  );

  const handlePreferredDateChange = (date: Date | null) => {
    const updatedFormData = {
      ...formData,
      preferredDate: date ?? new Date()
    } as AppointmentInterface

    setFormData(updatedFormData);

    const preferredDateNumber = date?.getDay();
    const schedule = updatedFormData
      ?.doctor
      ?.clinicSchedules
      .find(clinicSchedule => clinicSchedule.clinicLocation === formData.location)
      ?.schedules.find(schedule => schedule.dayToNumberMap[schedule.day] === preferredDateNumber);

    const availableTimeBlocks = [`${schedule?.start} - ${schedule?.end}`];
    setAvailableTimeBlocks(availableTimeBlocks);
  };

  const filterDatesByDoctorSchedule = (date: Date): boolean => {
    const dateDay = date.getDay();
    return availableDayNumbers.includes(dateDay as DayNumber);
  }

  return (
    <form action="" className="space-y-4">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">Name</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">Age</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Age"
            type="number"
            id="age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="phone">Phone</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            id="phone"
          />
        </div>
        <div>
          {serviceResponse.error && (
            <div>error retrieving services</div>
          )}
          {serviceResponse.isLoading && (
            <div>...loading services</div>
          )}
          {serviceResponse.data && (
            <ServiceSelection 
              services={serviceResponse.data}
              defaultServiceIndex={getIndexByName(serviceResponse.data, 'name', defaultServiceName)}
              handleServiceChange={handleServiceChange}
            />
          )}
        </div>
        <div>
          {doctorResponse.error && (
            <div>error retrieving doctors</div>
          )}
          {doctorResponse.isLoading && (
            <div>...loading doctors</div>
          )}
          {doctorResponse.data && (
            <DoctorSelection 
              doctors={doctorResponse.data}
              defaultDoctorIndex={getIndexByName(doctorResponse.data, 'name', defaultDoctorName)}
              handleDoctorChange={handleDoctorChange}
            />
          )}
        </div>
      </div>
        
      <div className="flex flex-row items-end space-x-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="preferredDate">Preferred Appointment Date</label>
          <DatePicker 
            id="preferredDate"
            className="rounded-lg border-gray-200 p-3 text-sm"
            selected={formData.preferredDate} 
            filterDate={filterDatesByDoctorSchedule}
            onChange={handlePreferredDateChange} 
            minDate={new Date()}
          />
        </div>



        {availableTimeBlocks?.map((timeBlock) => (
          <div
            key={timeBlock}
          >
            <input
              className="peer sr-only"
              id={timeBlock}
              type="radio"
              tab-index="-1"
              name="timeBlockOption"
            />
  
            <label
              htmlFor={timeBlock}
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              tab-index="0"
            >
              <span className="text-sm">{timeBlock}</span>
            </label>
          </div>
        ))} 
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="medicalConcern">Medical Concern</label>

        <textarea
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Medical Concern"
          rows={8}
          id="medicalConcern"
        ></textarea>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
        >
          Request Appointment
        </button>
      </div>
    </form>
  )
}