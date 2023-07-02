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

interface AppointmentFormProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentForm({defaultServiceName, defaultDoctorName}: AppointmentFormProps) {
  const serviceResponse = useSWR<ServiceClass[], any>('/api/services', fetcher);
  const doctorResponse = useSWR<DoctorClass[], any>('/api/doctors', fetcher);
  const [ preferredDate, setPreferredDate ] = useState<Date>();
  const [ selectedDoctor, setSelectedDoctor ] = useState<DoctorClass>();
  const [ selectedLocation, setSelectedLocation ] = useState("Mom & Me Clinic - Room 611");
  const [ availableDayNumbers, setAvailableDayNumbers ] = useState<number[]>([]);

  const handleServiceChange = useCallback(
    (selectedService: ServiceClass) => {
      console.log(selectedService);
    }, []
  );

  const handleDoctorChange = useCallback(
    (selectedDoctor: DoctorClass) => {
      setSelectedDoctor(selectedDoctor);
      setPreferredDate(undefined);
      //changing doctor will filter the dates are available for that dr in a given week
      //This in turn should also display the available time blocks for the given day.

      const clinicSchedule = selectedDoctor
      ?.clinicSchedules
      .find(clinicSchedule => clinicSchedule.clinicLocation === selectedLocation);
      
      if (clinicSchedule) {
        const availableDays = clinicSchedule.schedules.map(schedule => schedule.dayToNumberMap[schedule.day]);
        setAvailableDayNumbers(availableDays);
      }
    }, [selectedLocation]
  );

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
            selected={preferredDate} 
            filterDate={filterDatesByDoctorSchedule}
            onChange={(date) => setPreferredDate(date ?? new Date())} 
            minDate={new Date()}
          />
        </div>

        <div>
          <input
            className="peer sr-only"
            id="option1"
            type="radio"
            tab-index="-1"
            name="option"
          />

          <label
            htmlFor="option1"
            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
            tab-index="0"
          >
            <span className="text-sm">AM</span>
          </label>
        </div>

        <div>
          <input
            className="peer sr-only"
            id="option2"
            type="radio"
            tab-index="-1"
            name="option"
          />

          <label
            htmlFor="option2"
            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
            tab-index="0"
          >
            <span className="text-sm">PM</span>
          </label>
        </div>
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