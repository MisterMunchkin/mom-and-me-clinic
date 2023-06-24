'use client'

import { useCallback } from "react";
import ServiceSelection from "./ServiceSelection";
import { ServiceClass } from "@/classes/service";

export default function AppointmentForm() {


  const handleServiceChange = useCallback(
    (selectedService: ServiceClass) => {
      console.log(selectedService);
    }, []
  );

  return (
    <form action="" className="space-y-4">
      <div>
        <label className="sr-only" htmlFor="name">Name</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="age">Age</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Age"
            type="number"
            id="age"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="phone">Phone</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            id="phone"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <ServiceSelection 
             handleServiceChange={handleServiceChange}
          />
      </div>

      <div>
        <label className="sr-only" htmlFor="medicalConcern">Medical Concern</label>

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