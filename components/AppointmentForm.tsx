'use client'

import { useCallback } from "react";
import ServiceSelection from "./inputs/ServiceSelection";
import { ServiceClass } from "@/classes/service";
import useSWR from "swr";
import { DoctorClass } from "@/classes/doctor";
import DoctorSelection from "./inputs/DoctorSelection";
import { getIndexByName } from "@/utilities/helpers";

interface AppointmentFormProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentForm({defaultServiceName, defaultDoctorName}: AppointmentFormProps) {
  const serviceResponse = useSWR<ServiceClass[], any>('/api/services', fetcher);
  const doctorResponse = useSWR<DoctorClass[], any>('/api/doctors', fetcher);
  const handleServiceChange = useCallback(
    (selectedService: ServiceClass) => {
      console.log(selectedService);
    }, []
  );

  const handleDoctorChange = useCallback(
    (selectedDoctor: DoctorClass) => {
      console.log(selectedDoctor)
    }, []
  );

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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
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